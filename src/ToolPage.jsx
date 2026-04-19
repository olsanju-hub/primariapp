import React from 'react'
import {
  AlertTriangle,
  ClipboardList,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'

export default function ToolPage({
  specialty,
  title,
  description,
  clinicalUse,
  whenToUse,
  scoreLabel,
  scoreValue,
  interpretation,
  conduct,
  note,
  tone = 'neutral',
  children,
}) {
  return (
    <article className='tool-page'>
      <header className='tool-hero'>
        <div className='tool-hero-copy'>
          <span className='section-kicker'>{specialty}</span>
          <h2>{title}</h2>
          <p className='section-copy'>{description}</p>
        </div>

        <div className='tool-hero-grid'>
          <div className='context-chip'>
            <ClipboardList size={18} />
            <div>
              <span>Utilidad clínica</span>
              <strong>{clinicalUse}</strong>
            </div>
          </div>
          <div className='context-chip'>
            <Stethoscope size={18} />
            <div>
              <span>Cuándo usarla</span>
              <strong>{whenToUse}</strong>
            </div>
          </div>
        </div>
      </header>

      <div className='tool-layout'>
        <section className='surface surface--form'>
          <div className='surface-head'>
            <div>
              <span className='surface-kicker'>Formulario</span>
              <h3>Completa la valoración clínica</h3>
            </div>
            <p>
              Selecciona la opción que mejor represente la situación actual del paciente.
            </p>
          </div>
          {children}
        </section>

        <aside className='tool-sidebar'>
          <section className={`result-panel result-panel--${tone}`}>
            <span className='result-panel-label'>{scoreLabel}</span>
            <strong className='result-panel-value'>{scoreValue}</strong>
            <p className='result-panel-copy'>{interpretation}</p>
          </section>

          <section className='surface surface--compact'>
            <div className='surface-inline-title'>
              <ShieldCheck size={18} />
              <h3>Conducta orientativa</h3>
            </div>
            <p>{conduct}</p>
          </section>

          {note ? (
            <section className='surface surface--compact surface--alert'>
              <div className='surface-inline-title'>
                <AlertTriangle size={18} />
                <h3>Consideraciones</h3>
              </div>
              <p>{note}</p>
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  )
}
