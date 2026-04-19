import React, { useMemo, useState } from 'react'
import ToolPage from '../ToolPage'

export default function WellsTVP() {
  const factors = [
    { key: 'cancer', label: 'Cáncer activo', value: 1 },
    { key: 'paralysis', label: 'Parálisis, paresia o yeso reciente en EEII', value: 1 },
    { key: 'bedrest', label: 'Encamamiento > 3 días o cirugía mayor reciente', value: 1 },
    { key: 'tenderness', label: 'Dolor a lo largo del trayecto venoso profundo', value: 1 },
    { key: 'entireLeg', label: 'Tumefacción de toda la pierna', value: 1 },
    { key: 'calf', label: 'Pantorrilla > 3 cm respecto a la contralateral', value: 1 },
    { key: 'edema', label: 'Edema con fóvea en la pierna sintomática', value: 1 },
    { key: 'collateral', label: 'Circulación colateral superficial', value: 1 },
    { key: 'alternative', label: 'Diagnóstico alternativo al menos tan probable', value: -2 },
  ]

  const [answers, setAnswers] = useState({})
  const total = useMemo(
    () => Object.values(answers).reduce((sum, value) => sum + value, 0),
    [answers]
  )

  const interpretation = () => {
    if (total >= 2) return 'TVP probable'
    return 'TVP improbable'
  }

  const conduct = () => {
    if (total >= 2) {
      return 'Solicitar ecografía venosa y completar estudio según disponibilidad y riesgo clínico.'
    }
    return 'Si la sospecha persiste, combinar con dímero-D y reevaluación clínica.'
  }

  const tone = total >= 2 ? 'warning' : 'positive'

  return (
    <ToolPage
      specialty='Urgencias'
      title='Wells TVP'
      description='Predice la probabilidad clínica de trombosis venosa profunda.'
      clinicalUse='Ayuda a decidir pruebas complementarias y priorización diagnóstica.'
      whenToUse='Dolor, edema o asimetría de extremidad inferior con sospecha de TVP.'
      scoreLabel='Puntuación Wells'
      scoreValue={`${total}`}
      interpretation={interpretation()}
      conduct={conduct()}
      note='Debe integrarse con dímero-D, ecografía y probabilidad clínica global.'
      tone={tone}
    >
      <div className='question-grid'>
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
                <span>{factor.value < 0 ? 'Diagnóstico alternativo presente' : 'Criterio presente'}</span>
                <strong>{factor.value > 0 ? `+${factor.value}` : factor.value}</strong>
              </label>
            </section>
          )
        })}
      </div>
    </ToolPage>
  )
}
