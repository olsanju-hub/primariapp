export function sumScore(answers) {
  return Object.values(answers).reduce((sum, value) => sum + value, 0)
}

export function formatScoreDelta(value) {
  if (value > 0) {
    return `+${value}`
  }

  return `${value}`
}

export function formatNumericScore(value) {
  if (Number.isNaN(value)) {
    return '--'
  }

  const rounded = Math.round(value * 10) / 10

  if (Number.isInteger(rounded)) {
    return `${rounded}`
  }

  return rounded.toFixed(1)
}

const SCORE2_REGION_SCALES = {
  low: {
    score2: {
      male: { scale1: -0.5699, scale2: 0.7476 },
      female: { scale1: -0.738, scale2: 0.7019 },
    },
    score2op: {
      male: { scale1: -0.34, scale2: 1.19 },
      female: { scale1: -0.52, scale2: 1.01 },
    },
  },
  moderate: {
    score2: {
      male: { scale1: -0.1565, scale2: 0.8009 },
      female: { scale1: -0.3143, scale2: 0.7701 },
    },
    score2op: {
      male: { scale1: 0.01, scale2: 1.25 },
      female: { scale1: -0.1, scale2: 1.1 },
    },
  },
  high: {
    score2: {
      male: { scale1: 0.3207, scale2: 0.936 },
      female: { scale1: 0.571, scale2: 0.9369 },
    },
    score2op: {
      male: { scale1: 0.08, scale2: 1.15 },
      female: { scale1: 0.38, scale2: 1.09 },
    },
  },
  veryHigh: {
    score2: {
      male: { scale1: 0.5836, scale2: 0.8294 },
      female: { scale1: 0.9412, scale2: 0.8329 },
    },
    score2op: {
      male: { scale1: 0.05, scale2: 0.7 },
      female: { scale1: 0.38, scale2: 0.69 },
    },
  },
}

function clampProbability(value) {
  return Math.min(Math.max(value, 1e-12), 1 - 1e-12)
}

function getScore2Thresholds(age) {
  if (age < 50) {
    return { high: 2.5, veryHigh: 7.5 }
  }

  if (age < 70) {
    return { high: 5, veryHigh: 10 }
  }

  return { high: 7.5, veryHigh: 15 }
}

export function calculateScore2Risk({
  sex,
  age,
  smoker,
  systolicBp,
  totalCholesterol,
  hdlCholesterol,
  region,
}) {
  if (
    !Number.isFinite(age) ||
    !Number.isFinite(systolicBp) ||
    !Number.isFinite(totalCholesterol) ||
    !Number.isFinite(hdlCholesterol)
  ) {
    return null
  }

  const scales = SCORE2_REGION_SCALES[region]?.score2?.[sex]

  if (!scales) {
    return null
  }

  const ageTerm = (age - 60) / 5
  const sbpTerm = (systolicBp - 120) / 20
  const totalTerm = totalCholesterol - 6
  const hdlTerm = (hdlCholesterol - 1.3) / 0.5
  const smokingTerm = smoker ? 1 : 0

  const linearPredictor =
    (sex === 'male' ? 0.3742 : 0.4648) * ageTerm +
    (sex === 'male' ? 0.6012 : 0.7744) * smokingTerm +
    (sex === 'male' ? 0.2777 : 0.3131) * sbpTerm +
    (sex === 'male' ? 0.1458 : 0.1002) * totalTerm +
    (sex === 'male' ? -0.2698 : -0.2606) * hdlTerm +
    (sex === 'male' ? -0.0755 : -0.1088) * ageTerm * smokingTerm +
    (sex === 'male' ? -0.0255 : -0.0277) * ageTerm * sbpTerm +
    (sex === 'male' ? -0.0281 : -0.0226) * ageTerm * totalTerm +
    (sex === 'male' ? 0.0426 : 0.0613) * ageTerm * hdlTerm

  const baselineSurvival = sex === 'male' ? 0.9605 : 0.9776
  const uncalibratedRisk = clampProbability(1 - baselineSurvival ** Math.exp(linearPredictor))
  const calibratedRisk = clampProbability(
    1 -
      Math.exp(
        -Math.exp(scales.scale1 + scales.scale2 * Math.log(-Math.log(1 - uncalibratedRisk)))
      )
  )

  return calibratedRisk * 100
}

export function calculateScore2OpRisk({
  sex,
  age,
  smoker,
  systolicBp,
  totalCholesterol,
  hdlCholesterol,
  region,
}) {
  if (
    !Number.isFinite(age) ||
    !Number.isFinite(systolicBp) ||
    !Number.isFinite(totalCholesterol) ||
    !Number.isFinite(hdlCholesterol)
  ) {
    return null
  }

  const scales = SCORE2_REGION_SCALES[region]?.score2op?.[sex]

  if (!scales) {
    return null
  }

  const ageTerm = age - 73
  const sbpTerm = systolicBp - 150
  const totalTerm = totalCholesterol - 6
  const hdlTerm = hdlCholesterol - 1.4
  const smokingTerm = smoker ? 1 : 0

  const linearPredictor =
    (sex === 'male' ? 0.0634 : 0.0789) * ageTerm +
    (sex === 'male' ? 0.3524 : 0.4921) * smokingTerm +
    (sex === 'male' ? 0.0094 : 0.0102) * sbpTerm +
    (sex === 'male' ? 0.085 : 0.0605) * totalTerm +
    (sex === 'male' ? -0.3564 : -0.304) * hdlTerm +
    (sex === 'male' ? -0.0247 : -0.0255) * ageTerm * smokingTerm +
    (sex === 'male' ? -0.0005 : -0.0004) * ageTerm * sbpTerm +
    (sex === 'male' ? 0.0073 : -0.0009) * ageTerm * totalTerm +
    (sex === 'male' ? 0.0091 : 0.0154) * ageTerm * hdlTerm

  const uncalibratedRisk = clampProbability(
    sex === 'male'
      ? 1 - 0.7576 ** Math.exp(linearPredictor - 0.0929)
      : 1 - 0.8082 ** Math.exp(linearPredictor - 0.229)
  )

  const calibratedRisk = clampProbability(
    1 -
      Math.exp(
        -Math.exp(scales.scale1 + scales.scale2 * Math.log(-Math.log(1 - uncalibratedRisk)))
      )
  )

  return calibratedRisk * 100
}

export function getScore2Assessment(age, riskPercent, outsideValidatedPopulation = false) {
  if (outsideValidatedPopulation) {
    return {
      interpretation: 'Fuera del ámbito validado',
      conduct:
        'SCORE2 y SCORE2-OP no están validados para ASCVD establecida, diabetes, ERC moderada-grave o trastornos lipídicos/hipertensivos raros.',
      tone: 'neutral',
      category: 'Fuera de ámbito',
    }
  }

  if (!Number.isFinite(riskPercent)) {
    return {
      interpretation: 'Pendiente de completar',
      conduct:
        'Introduce edad, sexo, tabaquismo, presión arterial y perfil lipídico para estimar el riesgo a 10 años.',
      tone: 'neutral',
      category: 'Pendiente',
    }
  }

  const { high, veryHigh } = getScore2Thresholds(age)

  if (riskPercent < high) {
    return {
      interpretation: 'Riesgo bajo-moderado',
      conduct:
        'Prioriza hábitos, control tensional y lipídico, y reevalúa el riesgo si cambian los factores o la edad.',
      tone: 'positive',
      category: 'Bajo-moderado',
    }
  }

  if (riskPercent < veryHigh) {
    return {
      interpretation: 'Riesgo alto',
      conduct:
        'Intensifica el control de factores de riesgo y valora tratamiento preventivo con decisión compartida.',
      tone: 'warning',
      category: 'Alto',
    }
  }

  return {
    interpretation: 'Riesgo muy alto',
    conduct:
      'La carga de riesgo justifica intervención preventiva intensiva y revisión completa del perfil cardiovascular.',
    tone: 'critical',
    category: 'Muy alto',
  }
}

export function getCha2ds2VascAssessment(total, femaleSexSelected) {
  const lowRisk = total === 0 || (femaleSexSelected && total === 1)
  const considerOac =
    (!femaleSexSelected && total === 1) || (femaleSexSelected && total === 2)

  if (lowRisk) {
    return {
      interpretation: femaleSexSelected && total === 1 ? 'Sexo femenino aislado' : 'Riesgo tromboembólico bajo',
      conduct:
        'No suele indicar anticoagulación basándose solo en la escala. Reevalúa si aparecen nuevos factores de riesgo.',
      tone: 'positive',
    }
  }

  if (considerOac) {
    return {
      interpretation: 'Valorar anticoagulación',
      conduct:
        'Existe un factor no sexual añadido. Considera anticoagulación con decisión compartida y revisa HAS-BLED.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'Anticoagulación generalmente indicada',
    conduct:
      'El riesgo tromboembólico es alto por escala. Revisa contraindicaciones, función renal y riesgo hemorrágico.',
    tone: 'critical',
  }
}

export function getHasBledAssessment(total) {
  if (total <= 1) {
    return {
      interpretation: 'Riesgo hemorrágico bajo',
      conduct:
        'Mantén revisión periódica y corrige factores reversibles si aparecen durante el seguimiento.',
      tone: 'positive',
    }
  }

  if (total === 2) {
    return {
      interpretation: 'Riesgo hemorrágico relevante',
      conduct:
        'Conviene optimizar presión arterial, interacciones y seguimiento antes y durante la anticoagulación.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'Riesgo hemorrágico alto',
    conduct:
      'Una puntuación ≥ 3 obliga a vigilancia estrecha y corrección activa de factores modificables; no contraindica por sí sola anticoagular.',
    tone: 'critical',
  }
}

export function getBarthelAssessment(total, complete = true) {
  if (!complete) {
    return {
      interpretation: 'Completa la valoración',
      conduct: 'Selecciona los 10 ítems antes de interpretar el nivel de dependencia.',
      tone: 'neutral',
    }
  }

  if (total === 100) {
    return {
      interpretation: 'Independencia funcional',
      conduct: 'Mantén seguimiento funcional habitual y revisa si aparecen caídas o cambios del entorno.',
      tone: 'positive',
    }
  }

  if (total >= 91) {
    return {
      interpretation: 'Dependencia ligera',
      conduct: 'Suele beneficiarse de apoyo puntual y prevención activa de deterioro funcional.',
      tone: 'positive',
    }
  }

  if (total >= 61) {
    return {
      interpretation: 'Dependencia moderada',
      conduct: 'Valora apoyo domiciliario, fisioterapia y ajuste de recursos para mantener autonomía.',
      tone: 'warning',
    }
  }

  if (total >= 21) {
    return {
      interpretation: 'Dependencia severa',
      conduct: 'Conviene planificar cuidados más intensivos, soporte cuidador y revisión geriátrica integral.',
      tone: 'critical',
    }
  }

  return {
    interpretation: 'Dependencia total',
    conduct: 'Prioriza planificación de cuidados continuos, movilización segura y protección frente a complicaciones de inmovilidad.',
    tone: 'critical',
  }
}

export function getLawtonAssessment(total, complete = true) {
  if (!complete) {
    return {
      interpretation: 'Completa la valoración',
      conduct: 'Selecciona los 8 dominios para interpretar la autonomía instrumental.',
      tone: 'neutral',
    }
  }

  const dependentActivities = 8 - total

  if (dependentActivities === 0) {
    return {
      interpretation: 'Autonomía instrumental conservada',
      conduct: 'Mantén vigilancia funcional y revisa si aparecen dificultades en manejo doméstico, medicación o finanzas.',
      tone: 'positive',
    }
  }

  if (dependentActivities <= 2) {
    return {
      interpretation: `Dependencia en ${dependentActivities} AIVD`,
      conduct: 'Detecta qué tareas concretas necesitan apoyo y revisa seguridad en domicilio y adherencia terapéutica.',
      tone: 'warning',
    }
  }

  if (dependentActivities <= 5) {
    return {
      interpretation: `Dependencia en ${dependentActivities} AIVD`,
      conduct: 'La limitación instrumental es relevante y suele justificar apoyo estructurado o supervisión funcional.',
      tone: 'warning',
    }
  }

  return {
    interpretation: `Dependencia en ${dependentActivities} AIVD`,
    conduct: 'La autonomía instrumental está muy comprometida; revisa soporte social, cuidador principal y necesidad de recursos adicionales.',
    tone: 'critical',
  }
}

export function getPfeifferAssessment(adjustedErrors, complete = true) {
  if (!complete) {
    return {
      interpretation: 'Completa la valoración',
      conduct: 'Responde las 10 preguntas para clasificar el cribado cognitivo.',
      tone: 'neutral',
    }
  }

  if (adjustedErrors <= 2) {
    return {
      interpretation: 'Función cognitiva dentro de rango',
      conduct: 'Si persiste sospecha clínica, contrasta con informador y otras pruebas cognitivas o funcionales.',
      tone: 'positive',
    }
  }

  if (adjustedErrors <= 4) {
    return {
      interpretation: 'Deterioro cognitivo leve',
      conduct: 'Conviene ampliar estudio, revisar causas reversibles y contrastar con funcionalidad e informador.',
      tone: 'warning',
    }
  }

  if (adjustedErrors <= 7) {
    return {
      interpretation: 'Deterioro cognitivo moderado',
      conduct: 'Requiere valoración cognitiva y funcional más completa, además de revisar seguridad y soporte.',
      tone: 'critical',
    }
  }

  return {
    interpretation: 'Deterioro cognitivo grave',
    conduct: 'La carga de errores es alta; revisa delirium, funcionalidad, capacidad de autocuidado y necesidad de apoyo intenso.',
    tone: 'critical',
  }
}

export function getFrailAssessment(total, complete = true) {
  if (!complete) {
    return {
      interpretation: 'Completa la valoración',
      conduct: 'Selecciona los 5 criterios antes de interpretar fragilidad.',
      tone: 'neutral',
    }
  }

  if (total === 0) {
    return {
      interpretation: 'Robusto',
      conduct: 'Mantén actividad física, nutrición adecuada y seguimiento evolutivo según contexto clínico.',
      tone: 'positive',
    }
  }

  if (total <= 2) {
    return {
      interpretation: 'Prefragilidad',
      conduct: 'Es buen momento para intervenir sobre fuerza, movilidad, nutrición y comorbilidad antes de mayor deterioro.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'Fragilidad',
    conduct: 'Sugiere vulnerabilidad clínica relevante y justifica valoración geriátrica más amplia y plan de intervención.',
    tone: 'critical',
  }
}

export function getNews2Assessment(total, hasSingleCritical) {
  if (total >= 7) {
    return {
      interpretation: 'Respuesta urgente de alto nivel',
      conduct:
        'Escalada inmediata, monitorización continua y valoración urgente por clínico competente.',
      tone: 'critical',
    }
  }

  if (total >= 5) {
    return {
      interpretation: 'Riesgo de deterioro agudo',
      conduct:
        'Valoración urgente, reevaluación frecuente y considerar sepsis u otra causa de deterioro.',
      tone: 'warning',
    }
  }

  if (hasSingleCritical) {
    return {
      interpretation: 'Parámetro crítico aislado',
      conduct:
        'Un único parámetro con 3 puntos exige revisión clínica urgente aunque la suma total sea menor de 5.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'Riesgo fisiológico bajo',
    conduct: 'Seguimiento clínico y repetición de constantes según evolución.',
    tone: 'positive',
  }
}

export function getCrb65Assessment(total) {
  if (total === 0) {
    return {
      interpretation: 'Riesgo bajo',
      conduct:
        'Manejo ambulatorio posible si no hay hipoxemia, sepsis, inestabilidad o barreras de soporte.',
      tone: 'positive',
    }
  }

  if (total === 1) {
    return {
      interpretation: 'Riesgo intermedio',
      conduct:
        'Valorar derivación o vigilancia estrecha según saturación, comorbilidad, fragilidad y contexto social.',
      tone: 'warning',
    }
  }

  if (total === 2) {
    return {
      interpretation: 'Riesgo intermedio-alto',
      conduct: 'Considerar derivación hospitalaria para valoración, tratamiento y monitorización.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'Riesgo alto',
    conduct: 'Derivación urgente y valoración hospitalaria inmediata.',
    tone: 'critical',
  }
}

export function getCurb65Assessment(total) {
  if (total <= 1) {
    return {
      interpretation: 'Riesgo bajo',
      conduct:
        'Alta o manejo ambulatorio posibles si el contexto clínico, la oxigenación y el soporte lo permiten.',
      tone: 'positive',
    }
  }

  if (total === 2) {
    return {
      interpretation: 'Riesgo intermedio',
      conduct:
        'Valorar observación, hospital de día/SDEC o ingreso según gravedad global, hipoxemia y comorbilidad.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'Riesgo alto',
    conduct: 'Ingreso hospitalario y valorar cuidados críticos si la situación clínica lo requiere.',
    tone: 'critical',
  }
}

export function getPercAssessment(total, lowPretestProbability) {
  if (lowPretestProbability && total === 0) {
    return {
      interpretation: 'PERC negativo',
      conduct:
        'Si la probabilidad clínica previa es baja, puede evitarse ampliar estudio solo para descartar TEP.',
      tone: 'positive',
    }
  }

  if (!lowPretestProbability && total === 0) {
    return {
      interpretation: 'No aplicable para exclusión',
      conduct:
        'Aunque todos los criterios sean negativos, la regla no debe usarse si la sospecha clínica no es baja.',
      tone: 'neutral',
    }
  }

  return {
    interpretation: 'PERC positivo',
    conduct:
      'No descarta TEP. Continuar la estrategia diagnóstica según probabilidad clínica, dímero-D e imagen si procede.',
    tone: 'warning',
  }
}

export function getWellsTvpAssessment(total) {
  if (total >= 2) {
    return {
      interpretation: 'TVP probable',
      conduct:
        'Solicitar ecografía venosa proximal y seguir el circuito diagnóstico/terapéutico si la demora o el riesgo clínico lo justifican.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'TVP improbable',
    conduct:
      'Si el contexto lo permite, completar con dímero-D. Si es positivo o la sospecha persiste, continuar con ecografía.',
    tone: 'positive',
  }
}

export function getWellsTepAssessment(total) {
  if (total > 4) {
    return {
      interpretation: 'TEP probable',
      conduct:
        'Solicitar imagen diagnóstica de forma prioritaria. Si se retrasa y la sospecha es relevante, seguir el protocolo terapéutico local.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'TEP no probable',
    conduct:
      'Continuar el algoritmo con dímero-D si el contexto clínico lo permite. Si es positivo, pasar a imagen.',
    tone: 'positive',
  }
}

export function getSimplifiedGenevaAssessment(total) {
  if (total >= 3) {
    return {
      interpretation: 'TEP probable',
      conduct:
        'La probabilidad pretest es alta para la versión dicotómica. Continuar con imagen y manejo según el circuito local.',
      tone: 'warning',
    }
  }

  return {
    interpretation: 'TEP no probable',
    conduct:
      'La puntuación permite un paso intermedio con dímero-D si el escenario clínico es adecuado. No excluye TEP por sí sola.',
    tone: 'positive',
  }
}

export function getYearsAssessment(criteriaCount, dDimer) {
  if (dDimer == null) {
    return {
      interpretation: 'Pendiente de completar',
      conduct:
        'Introduce el dímero-D para cerrar el algoritmo YEARS y decidir si puede evitarse la imagen.',
      tone: 'neutral',
    }
  }

  const threshold = criteriaCount === 0 ? 1000 : 500

  if (dDimer < threshold) {
    return {
      interpretation: 'TEP descartado por YEARS',
      conduct:
        'Con este número de ítems YEARS y este dímero-D, el algoritmo evita imagen si no hay otros motivos clínicos para ampliar estudio.',
      tone: 'positive',
    }
  }

  return {
    interpretation: 'Requiere imagen',
    conduct:
      'El dímero-D supera el corte aplicable del algoritmo. Continuar el estudio con imagen según disponibilidad y contexto.',
    tone: 'warning',
  }
}
