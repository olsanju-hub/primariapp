import React, { useState, useMemo } from 'react'
import ToolPage from '../ToolPage'

export default function CHA2DS2VASc() {
  const factors = [
    { k: 'insuf', t: 'Insuficiencia cardiaca', v: 1 },
    { k: 'htn', t: 'Hipertensión', v: 1 },
    { k: 'dm', t: 'Diabetes', v: 1 },
    { k: 'stroke', t: 'Ictus, AIT o tromboembolismo previo', v: 2 },
    { k: 'vasc', t: 'Enfermedad vascular', v: 1 },
    { k: 'female', t: 'Sexo femenino', v: 1 },
  ]
  const ageBands = [
    { label: 'Menor de 65 años', value: 0 },
    { label: 'Entre 65 y 74 años', value: 1 },
    { label: '75 años o más', value: 2 },
  ]
  const [sel, setSel] = useState({})
  const [ageScore, setAgeScore] = useState(0)
  const total = useMemo(
    () => Object.values(sel).reduce((sum, value) => sum + value, 0) + ageScore,
    [ageScore, sel]
  )
  const set = (k, v, checked) => setSel((current) => ({ ...current, [k]: checked ? v : 0 }))

  const interpret = () => {
    if (total === 0) return 'Bajo riesgo'
    if (total === 1) return 'Riesgo intermedio'
    return 'Alto riesgo'
  }

  const conduct = () => {
    if (total === 0) return 'Sin indicación de alto riesgo tromboembólico por escala; revisar contexto y reevaluar si cambian factores.'
    if (total === 1) return 'Valorar anticoagulación en decisión compartida según sexo, edad, comorbilidad y riesgo hemorrágico.'
    return 'Riesgo tromboembólico elevado: revisar indicación de anticoagulación y balance con HAS-BLED.'
  }

  const tone = total >= 2 ? 'critical' : total === 1 ? 'warning' : 'positive'

  return (
    <ToolPage
      specialty='Cardiología'
      title='CHA₂DS₂-VASc'
      description='Escala para estimar riesgo tromboembólico en fibrilación auricular no valvular.'
      clinicalUse='Apoya la indicación de anticoagulación junto al juicio clínico y preferencias del paciente.'
      whenToUse='Consulta de FA, revisión de tratamiento y reevaluación del balance riesgo-beneficio.'
      scoreLabel='Puntuación total'
      scoreValue={`${total}`}
      interpretation={interpret()}
      conduct={conduct()}
      note='La edad se registra como tramo único para evitar doble contabilización.'
      tone={tone}
    >
      <div className='question-grid'>
        <section className='question-card'>
          <div className='question-card-head'>
            <span className='question-index'>01</span>
            <h4>Edad</h4>
          </div>

          <div className='option-stack'>
            {ageBands.map((band) => {
              const selected = ageScore === band.value
              return (
                <label
                  key={band.label}
                  className={selected ? 'choice-card choice-card--selected' : 'choice-card'}
                >
                  <input
                    type='radio'
                    name='cha2-age'
                    checked={selected}
                    onChange={() => setAgeScore(band.value)}
                  />
                  <span>{band.label}</span>
                  <strong>+{band.value}</strong>
                </label>
              )
            })}
          </div>
        </section>

        {factors.map((factor, index) => {
          const selected = Boolean(sel[factor.k])
          return (
            <section key={factor.k} className='question-card'>
              <div className='question-card-head'>
                <span className='question-index'>{String(index + 2).padStart(2, '0')}</span>
                <h4>{factor.t}</h4>
              </div>

              <label className={selected ? 'choice-card choice-card--selected' : 'choice-card'}>
                <input
                  type='checkbox'
                  checked={selected}
                  onChange={(event) => set(factor.k, factor.v, event.target.checked)}
                />
                <span>Factor presente</span>
                <strong>+{factor.v}</strong>
              </label>
            </section>
          )
        })}
      </div>
    </ToolPage>
  )
}
