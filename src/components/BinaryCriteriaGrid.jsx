import React from 'react'
import { formatScoreDelta } from '../scoreUtils'

export default function BinaryCriteriaGrid({
  answers,
  criteria,
  onToggle,
  compact = false,
  selectionLabel = 'Criterio presente',
  startIndex = 1,
}) {
  return (
    <div className={compact ? 'question-grid question-grid--compact' : 'question-grid'}>
      {criteria.map((criterion, index) => {
        const checked = Boolean(answers[criterion.key])

        return (
          <section key={criterion.key} className='question-card'>
            <div className='question-card-head'>
              <span className='question-index'>
                {String(index + startIndex).padStart(2, '0')}
              </span>
              <h4>{criterion.label}</h4>
            </div>

            <label className={checked ? 'choice-card choice-card--selected' : 'choice-card'}>
              <input
                type='checkbox'
                checked={checked}
                onChange={(event) => onToggle(criterion, event.target.checked)}
              />
              <span>{criterion.selectionLabel ?? selectionLabel}</span>
              <strong>{formatScoreDelta(criterion.value ?? 1)}</strong>
            </label>
          </section>
        )
      })}
    </div>
  )
}
