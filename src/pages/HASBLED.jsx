import React, { useState, useMemo } from 'react'
import ToolPage from '../ToolPage'

export default function HASBLED() {
  const factors = [
    { k: 'h', t: 'HTA con PAS superior a 160 mmHg', v: 1 },
    { k: 'a', t: 'Función renal o hepática alterada', v: 1 },
    { k: 's', t: 'Ictus previo', v: 1 },
    { k: 'b', t: 'Sangrado previo o predisposición hemorrágica', v: 1 },
    { k: 'l', t: 'INR lábil', v: 1 },
    { k: 'e', t: 'Edad superior a 65 años', v: 1 },
    { k: 'd', t: 'Fármacos o alcohol de riesgo', v: 1 },
  ]
  const [sel, setSel] = useState({})
  const total = useMemo(() => Object.values(sel).reduce((sum, value) => sum + value, 0), [sel])
  const set = (k, v, checked) => setSel((current) => ({ ...current, [k]: checked ? v : 0 }))

  const interpret = () => {
    if (total <= 1) return 'Riesgo bajo'
    if (total === 2) return 'Riesgo moderado'
    return 'Riesgo alto'
  }

  const conduct = () => {
    if (total <= 1) return 'Control habitual y revisión periódica de factores modificables.'
    if (total === 2) return 'Optimizar presión arterial, interacciones y seguimiento más estrecho si se anticoagula.'
    return 'Riesgo hemorrágico elevado: corregir factores reversibles y extremar control clínico si se mantiene anticoagulación.'
  }

  const tone = total >= 3 ? 'critical' : total === 2 ? 'warning' : 'positive'

  return (
    <ToolPage
      specialty='Cardiología'
      title='HAS-BLED'
      description='Estratifica el riesgo hemorrágico en pacientes candidatos a anticoagulación.'
      clinicalUse='Sirve para detectar factores modificables y planificar seguimiento más seguro.'
      whenToUse='Antes y durante anticoagulación, siempre junto al contexto clínico global.'
      scoreLabel='Puntuación total'
      scoreValue={`${total} / 9`}
      interpretation={interpret()}
      conduct={conduct()}
      note='Una puntuación elevada no contraindica por sí sola anticoagular; obliga a corregir riesgos y vigilar mejor.'
      tone={tone}
    >
      <div className='question-grid'>
        {factors.map((factor, index) => {
          const selected = Boolean(sel[factor.k])
          return (
            <section key={factor.k} className='question-card'>
              <div className='question-card-head'>
                <span className='question-index'>{String(index + 1).padStart(2, '0')}</span>
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
