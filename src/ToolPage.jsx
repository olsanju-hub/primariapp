import React from 'react'
import {
  AlertTriangle,
  ClipboardList,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { specialties } from './appData'

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
  const specialtyEntry = specialties.find((entry) => entry.name === specialty) ?? null
  const urgent = specialtyEntry?.id === 'urgencias'

  const scoreToneClass = {
    neutral: 'score-panel score-panel--neutral',
    positive: 'score-panel score-panel--positive',
    warning: 'score-panel score-panel--warning',
    critical: 'score-panel score-panel--critical',
  }[tone] ?? 'score-panel score-panel--neutral'

  return (
    <article className='tool-page'>
      <div
        className={
          urgent
            ? 'floating-card-no-hover tool-stage tool-stage--urgent'
            : 'floating-card-no-hover tool-stage'
        }
      >
        <div className='tool-stage-head'>
          <div className='tool-stage-copy'>
            <div className='tool-chip-row'>
              <span className={urgent ? 'tool-chip tool-chip--urgent' : 'tool-chip'}>
                {specialty}
              </span>
              {status ? <span className='tool-chip tool-chip--muted'>{status}</span> : null}
            </div>

            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <div className='tool-meta-grid'>
            <section className='tool-meta-card'>
              <div className='tool-meta-title'>
                <ClipboardList size={16} />
                Utilidad
              </div>
              <p>{clinicalUse}</p>
            </section>

            <section className='tool-meta-card'>
              <div className='tool-meta-title'>
                <Stethoscope size={16} />
                Uso
              </div>
              <p>{whenToUse}</p>
            </section>
          </div>
        </div>

        <div className='tool-layout'>
          <section className='floating-card-no-hover tool-form-card'>{children}</section>

          <aside className='tool-side-stack'>
            <section className={scoreToneClass}>
              <span>{scoreLabel}</span>
              <strong>{scoreValue}</strong>
              <p>{interpretation}</p>
            </section>

            <section className='floating-card-no-hover tool-side-card'>
              <div className='tool-side-title'>
                <ShieldCheck size={18} />
                Conducta
              </div>
              <p>{conduct}</p>
            </section>

            {note ? (
              <section className='tool-note-card'>
                <div className='tool-side-title tool-side-title--urgent'>
                  <AlertTriangle size={18} />
                  Nota
                </div>
                <p>{note}</p>
              </section>
            ) : null}
          </aside>
        </div>
      </div>
    </article>
  )
}
