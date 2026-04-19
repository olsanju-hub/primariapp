import React, { useMemo, useState } from 'react'
import ToolPage from '../ToolPage'

export default function GAD7() {
  const questions = [
    'Sentirse nervioso, ansioso o con los nervios de punta.',
    'No poder parar o controlar la preocupación.',
    'Preocuparse demasiado por diferentes cosas.',
    'Dificultad para relajarse.',
    'Estar tan inquieto que cuesta permanecer sentado.',
    'Irritarse o enfadarse con facilidad.',
    'Sentir miedo como si algo terrible pudiera ocurrir.',
  ]
  const [scores, setScores] = useState(Array(7).fill(0))
  const total = useMemo(() => scores.reduce((sum, value) => sum + value, 0), [scores])
  const labels = ['Nada', 'Varios días', 'Más de la mitad de los días', 'Casi cada día']

  const interpret = () => {
    if (total <= 4) return 'Mínimo'
    if (total <= 9) return 'Leve'
    if (total <= 14) return 'Moderado'
    return 'Grave'
  }

  const conduct = () => {
    if (total <= 4) return 'Mantener observación clínica y reforzar medidas de autocuidado si hay malestar incipiente.'
    if (total <= 9) return 'Revisar impacto funcional, sueño, consumo y planificar reevaluación clínica.'
    if (total <= 14) return 'Valorar intervención psicológica estructurada y seguimiento con objetivos concretos.'
    return 'Priorizar evaluación clínica completa, funcionalidad y coordinación con salud mental si existe deterioro relevante.'
  }

  const tone = total >= 15 ? 'critical' : total >= 5 ? 'warning' : 'positive'

  return (
    <ToolPage
      specialty='Psiquiatría'
      title='GAD-7'
      description='Escala breve para cuantificar ansiedad generalizada y monitorizar respuesta clínica.'
      clinicalUse='Cribado estructurado de síntomas ansiosos e impacto subjetivo.'
      whenToUse='Consulta inicial, control evolutivo y apoyo en decisiones de seguimiento.'
      scoreLabel='Puntuación GAD-7'
      scoreValue={`${total} / 21`}
      interpretation={interpret()}
      conduct={conduct()}
      note='Interprétala junto al contexto clínico, sueño, consumo de sustancias y repercusión funcional.'
      tone={tone}
    >
      <div className='question-list'>
        {questions.map((question, index) => (
          <section key={question} className='question-card question-card--wide'>
            <div className='question-card-head'>
              <span className='question-index'>{String(index + 1).padStart(2, '0')}</span>
              <h4>{question}</h4>
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
                      name={`gad7-${index}`}
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
