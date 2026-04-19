import React, { useMemo, useState } from 'react'
import ToolPage from '../ToolPage'

export default function PHQ9() {
  const questions = [
    'Poco interés o placer en hacer cosas.',
    'Sentirse decaído, deprimido o sin esperanza.',
    'Dificultad para dormir, mantener el sueño o dormir demasiado.',
    'Sentirse cansado o con poca energía.',
    'Falta de apetito o comer en exceso.',
    'Sentirse mal con uno mismo o sensación de fracaso.',
    'Dificultad para concentrarse en lectura, trabajo o televisión.',
    'Moverse o hablar muy despacio, o lo contrario: inquietud notable.',
    'Pensamientos de que estaría mejor muerto o de hacerse daño.',
  ]
  const [scores, setScores] = useState(Array(9).fill(0))
  const total = useMemo(() => scores.reduce((sum, value) => sum + value, 0), [scores])
  const labels = ['Nada', 'Varios días', 'Más de la mitad de los días', 'Casi cada día']
  const itemNine = scores[8]

  const interpret = () => {
    if (total <= 4) return 'Mínimo'
    if (total <= 9) return 'Leve'
    if (total <= 14) return 'Moderado'
    if (total <= 19) return 'Moderadamente grave'
    return 'Grave'
  }

  const conduct = () => {
    if (itemNine > 0) {
      return 'Explorar riesgo autolítico de inmediato, valorar seguridad y priorizar derivación o soporte urgente según contexto.'
    }
    if (total <= 4) return 'Reforzar medidas generales y reevaluar solo si persisten síntomas o cambian factores de riesgo.'
    if (total <= 9) return 'Ofrecer seguimiento precoz, psicoeducación y reevaluación clínica estructurada.'
    if (total <= 14) return 'Valorar intervención psicológica, seguimiento estrecho y cribado de comorbilidad.'
    return 'Plantear abordaje intensivo, evaluación diagnóstica completa y coordinación con salud mental.'
  }

  const tone = itemNine > 0 || total >= 15 ? 'critical' : total >= 5 ? 'warning' : 'positive'

  return (
    <ToolPage
      specialty='Psiquiatría'
      title='PHQ-9'
      description='Cuestionario breve de depresión útil para cribado, cuantificación de severidad y seguimiento evolutivo.'
      clinicalUse='Apoya la conversación clínica y el seguimiento estructurado de síntomas depresivos.'
      whenToUse='Consulta de atención primaria, revisión de tratamiento y control evolutivo.'
      scoreLabel='Puntuación PHQ-9'
      scoreValue={`${total} / 27`}
      interpretation={interpret()}
      conduct={conduct()}
      note='Un valor mayor de cero en el ítem 9 exige explorar riesgo autolesivo con una entrevista clínica completa.'
      tone={tone}
    >
      <div className='question-list'>
        {questions.map((question, index) => (
          <section key={question} className='question-card question-card--wide'>
            <div className='question-card-head'>
              <span className='question-index'>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h4>Ítem {index + 1}</h4>
                <p>{question}</p>
              </div>
            </div>

            <div className='option-stack option-stack--inline'>
              {labels.map((label, value) => {
                const selected = scores[index] === value
                return (
                  <label
                    key={label}
                    className={selected ? 'choice-card choice-card--selected' : 'choice-card'}
                  >
                    <input
                      type='radio'
                      name={`phq9-${index}`}
                      checked={selected}
                      onChange={() =>
                        setScores((current) => {
                          const next = [...current]
                          next[index] = value
                          return next
                        })
                      }
                    />
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </label>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </ToolPage>
  )
}
