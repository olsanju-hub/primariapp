import React from 'react'
import {
  AlertTriangle,
  ClipboardList,
  Stethoscope,
  ShieldCheck,
} from 'lucide-react'

export default function ToolPage({
  specialty,
  status,
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
      <header className='surface surface--compact tool-header'>
        <div className='tool-header-main'>
          <div className='tool-header-tags'>
            <span className='tool-header-tag'>{specialty}</span>
            {status ? <span className='status-pill'>{status}</span> : null}
          </div>
          <h2>{title}</h2>
          <p className='tool-header-copy'>{description}</p>
        </div>

        <dl className='tool-meta-list'>
          <div className='tool-meta-item'>
            <dt className='tool-meta-label'>
              <ClipboardList size={16} />
              <span>Utilidad</span>
            </dt>
            <dd>{clinicalUse}</dd>
          </div>
          <div className='tool-meta-item'>
            <dt className='tool-meta-label'>
              <Stethoscope size={16} />
              <span>Uso</span>
            </dt>
            <dd>{whenToUse}</dd>
          </div>
        </dl>
      </header>

      <div className='tool-layout'>
        <section className='surface surface--form'>
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
              <h3>Conducta</h3>
            </div>
            <p>{conduct}</p>
          </section>

          {note ? (
            <section className='surface surface--compact surface--alert'>
              <div className='surface-inline-title'>
                <AlertTriangle size={18} />
                <h3>Nota</h3>
              </div>
              <p>{note}</p>
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  )
}
