import React, { useMemo, useState } from 'react'
import ToolPage from '../ToolPage'

export default function CentorMcIsaac() {
  const ageBands = [
    { label: '3 - 14 años', value: 1 },
    { label: '15 - 44 años', value: 0 },
    { label: '45 años o más', value: -1 },
  ]
  const factors = [
    { key: 'fever', label: 'Fiebre > 38 °C', value: 1 },
    { key: 'cough', label: 'Ausencia de tos', value: 1 },
    { key: 'adenopathy', label: 'Adenopatías cervicales dolorosas', value: 1 },
    { key: 'exudate', label: 'Exudado o hipertrofia amigdalar', value: 1 },
  ]

  const [ageScore, setAgeScore] = useState(0)
  const [answers, setAnswers] = useState({})
  const total = useMemo(
    () => Object.values(answers).reduce((sum, value) => sum + value, 0) + ageScore,
    [ageScore, answers]
  )

  const interpretation = () => {
    if (total <= 1) return 'Probabilidad baja de estreptococo'
    if (total <= 3) return 'Probabilidad intermedia'
    return 'Probabilidad alta'
  }

  const conduct = () => {
    if (total <= 1) {
      return 'Tratamiento sintomático; en general no precisa test microbiológico.'
    }
    if (total <= 3) {
      return 'Valorar test rápido o cultivo según disponibilidad y contexto clínico.'
    }
    return 'Alta probabilidad: valorar confirmación microbiológica y antibioterapia según protocolos.'
  }

  const tone = total >= 4 ? 'warning' : total >= 2 ? 'neutral' : 'positive'

  return (
    <ToolPage
      specialty='Atención Primaria'
      title='Centor/McIsaac'
      description='Escala clínica para estimar probabilidad de faringoamigdalitis estreptocócica.'
      clinicalUse='Orienta la indicación de test rápido y tratamiento antibiótico.'
      whenToUse='Odinofagia aguda sin foco alternativo claro.'
      scoreLabel='Puntuación total'
      scoreValue={`${total}`}
      interpretation={interpretation()}
      conduct={conduct()}
      note='No sustituye criterios epidemiológicos, exploración completa ni juicio clínico.'
      tone={tone}
    >
      <div className='question-grid'>
        <section className='question-card'>
          <div className='question-card-head'>
            <span className='question-index'>01</span>
            <h4>Edad</h4>
          </div>

          <div className='option-stack'>
            {ageBands.map((band) => (
              <label
                key={band.label}
                className={ageScore === band.value ? 'choice-card choice-card--selected' : 'choice-card'}
              >
                <input
                  type='radio'
                  name='centor-age'
                  checked={ageScore === band.value}
                  onChange={() => setAgeScore(band.value)}
                />
                <span>{band.label}</span>
                <strong>{band.value > 0 ? `+${band.value}` : band.value}</strong>
              </label>
            ))}
          </div>
        </section>

        {factors.map((factor, index) => {
          const checked = Boolean(answers[factor.key])

          return (
            <section key={factor.key} className='question-card'>
              <div className='question-card-head'>
                <span className='question-index'>{String(index + 2).padStart(2, '0')}</span>
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
