export function sumScore(answers) {
  return Object.values(answers).reduce((sum, value) => sum + value, 0)
}

export function formatScoreDelta(value) {
  if (value > 0) {
    return `+${value}`
  }

  return `${value}`
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
