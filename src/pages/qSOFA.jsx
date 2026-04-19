import React, { useState } from 'react'
import ToolPage from '../ToolPage'

export default function QSOFA() {
  const [fr, setFr] = useState(false)
  const [pas, setPas] = useState(false)
  const [gcs, setGcs] = useState(false)
  const total = (fr ? 1 : 0) + (pas ? 1 : 0) + (gcs ? 1 : 0)
  const interpretation = total >= 2 ? 'Alto riesgo de mala evolución' : 'Riesgo bajo en la escala'
  const conduct =
    total >= 2
      ? 'Priorizar valoración urgente, monitorización estrecha y búsqueda activa de disfunción orgánica o sepsis.'
      : 'Mantener vigilancia clínica y reevaluar si aparecen nuevos criterios o deterioro hemodinámico.'
  const tone = total >= 2 ? 'critical' : total === 1 ? 'warning' : 'positive'

  return (
    <ToolPage
      specialty='Urgencias'
      title='qSOFA'
      description='Herramienta de cribado rápido para identificar pacientes con posible sepsis y peor pronóstico.'
      clinicalUse='Apoya la priorización clínica en pacientes con sospecha de infección.'
      whenToUse='Valoración inicial en urgencias, consulta no demorable o seguimiento de deterioro agudo.'
      scoreLabel='Puntuación qSOFA'
      scoreValue={`${total} / 3`}
      interpretation={interpretation}
      conduct={conduct}
      note='No sustituye a la valoración completa. Una puntuación baja no excluye sepsis.'
      tone={tone}
    >
      <div className='question-grid question-grid--compact'>
        <section className='question-card'>
          <div className='question-card-head'>
            <span className='question-index'>01</span>
            <h4>Frecuencia respiratoria</h4>
          </div>
          <label className={fr ? 'choice-card choice-card--selected' : 'choice-card'}>
            <input type='checkbox' checked={fr} onChange={(event) => setFr(event.target.checked)} />
            <span>FR ≥ 22/min</span>
            <strong>+1</strong>
          </label>
        </section>

        <section className='question-card'>
          <div className='question-card-head'>
            <span className='question-index'>02</span>
            <h4>Presión arterial sistólica</h4>
          </div>
          <label className={pas ? 'choice-card choice-card--selected' : 'choice-card'}>
            <input type='checkbox' checked={pas} onChange={(event) => setPas(event.target.checked)} />
            <span>PAS ≤ 100 mmHg</span>
            <strong>+1</strong>
          </label>
        </section>

        <section className='question-card'>
          <div className='question-card-head'>
            <span className='question-index'>03</span>
            <h4>Estado mental</h4>
          </div>
          <label className={gcs ? 'choice-card choice-card--selected' : 'choice-card'}>
            <input type='checkbox' checked={gcs} onChange={(event) => setGcs(event.target.checked)} />
            <span>Glasgow &lt; 15</span>
            <strong>+1</strong>
          </label>
        </section>
      </div>
    </ToolPage>
  )
}
