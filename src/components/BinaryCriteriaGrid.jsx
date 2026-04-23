import React from 'react'
import { formatScoreDelta } from '../scoreUtils'

export default function BinaryCriteriaGrid({
  answers,
  criteria,
  onToggle,
  compact = false,
  selectionLabel,
  startIndex = 1,
}) {
  return (
    <div className={compact ? 'question-grid question-grid--compact' : 'question-grid'}>
      {criteria.map((criterion, index) => {
        const checked = Boolean(answers[criterion.key])
        const inlineLabel = criterion.selectionLabel ?? selectionLabel

        return (
          <section key={criterion.key} className='question-card'>
            <div className='question-card-head'>
              <span className='question-index'>
                {String(index + startIndex).padStart(2, '0')}
              </span>
              <h4>{criterion.label}</h4>
            </div>

            <label
              className={
                checked
                  ? 'choice-card choice-card--selected choice-card--binary'
                  : 'choice-card choice-card--binary'
              }
            >
              <input
                type='checkbox'
                checked={checked}
                aria-label={criterion.label}
                onChange={(event) => onToggle(criterion, event.target.checked)}
              />
              <span className='choice-card-binary'>
                <span
                  aria-hidden='true'
                  className={checked ? 'choice-card-indicator choice-card-indicator--selected' : 'choice-card-indicator'}
                />
                {inlineLabel ? <span className='choice-card-inline-label'>{inlineLabel}</span> : null}
                <span className='sr-only'>{checked ? 'Marcado' : 'No marcado'}</span>
              </span>
              <strong>{formatScoreDelta(criterion.value ?? 1)}</strong>
            </label>
          </section>
        )
      })}
    </div>
  )
}
