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
