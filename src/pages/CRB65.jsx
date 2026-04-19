import React, { useMemo, useState } from 'react'
import ToolPage from '../ToolPage'

export default function CRB65() {
  const factors = [
    { key: 'confusion', label: 'Confusión nueva', value: 1 },
    { key: 'respiratoryRate', label: 'Frecuencia respiratoria ≥ 30/min', value: 1 },
    { key: 'pressure', label: 'PAS < 90 o PAD ≤ 60 mmHg', value: 1 },
    { key: 'age', label: 'Edad ≥ 65 años', value: 1 },
  ]

  const [answers, setAnswers] = useState({})
  const total = useMemo(
    () => Object.values(answers).reduce((sum, value) => sum + value, 0),
    [answers]
  )

  const interpretation = () => {
    if (total === 0) return 'Riesgo bajo'
    if (total <= 2) return 'Riesgo intermedio'
    return 'Riesgo alto'
  }

  const conduct = () => {
    if (total === 0) return 'Manejo ambulatorio posible si el contexto clínico y social lo permite.'
    if (total <= 2) {
      return 'Valorar derivación hospitalaria, control estrecho y gravedad global.'
    }
    return 'Alta probabilidad de mala evolución: derivación urgente y valoración hospitalaria.'
  }

  const tone = total >= 3 ? 'critical' : total >= 1 ? 'warning' : 'positive'

  return (
    <ToolPage
      specialty='Neumología'
      title='CRB-65'
      description='Escala simple para estratificar gravedad en neumonía adquirida en la comunidad.'
      clinicalUse='Orienta nivel asistencial y necesidad de derivación.'
      whenToUse='Valoración inicial de neumonía en consulta, PAC o urgencias.'
      scoreLabel='Puntuación CRB-65'
      scoreValue={`${total} / 4`}
      interpretation={interpretation()}
      conduct={conduct()}
      note='No sustituye la valoración de hipoxemia, comorbilidad, capacidad de soporte y situación basal.'
      tone={tone}
    >
      <div className='question-grid question-grid--compact'>
        {factors.map((factor, index) => {
          const checked = Boolean(answers[factor.key])

          return (
            <section key={factor.key} className='question-card'>
              <div className='question-card-head'>
                <span className='question-index'>{String(index + 1).padStart(2, '0')}</span>
                <h4>{factor.label}</h4>
              </div>

              <label className={checked ? 'choice-card choice-card--selected' : 'choice-card'}>
                <input
                  type='checkbox'
                  checked={checked}
                  onChange={(event) =>
                    setAnswers((current) => ({
                      ...current,
                      [factor.key]: event.target.checked ? factor.value : 0,
                    }))
                  }
                />
                <span>Criterio presente</span>
                <strong>+1</strong>
              </label>
            </section>
          )
        })}
      </div>
    </ToolPage>
  )
}
