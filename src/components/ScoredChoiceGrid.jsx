import React from 'react'
import { formatScoreDelta } from '../scoreUtils'

export default function ScoredChoiceGrid({
  items,
  answers,
  onSelect,
  startIndex = 1,
  compact = false,
}) {
  return (
    <div className={compact ? 'question-grid question-grid--compact' : 'question-grid'}>
      {items.map((item, index) => (
        <section
          key={item.key}
          className={item.wide ? 'question-card question-card--wide' : 'question-card'}
        >
          <div className='question-card-head'>
            <span className='question-index'>
              {String(index + startIndex).padStart(2, '0')}
            </span>

            <div>
              <h4>{item.label}</h4>
              {item.helper ? <p className='question-helper'>{item.helper}</p> : null}
            </div>
          </div>

          <div className='option-stack option-stack--inline'>
            {item.options.map((option) => {
              const selected = answers[item.key] === option.value

              return (
                <label
                  key={`${item.key}-${option.label}`}
                  className={selected ? 'choice-card choice-card--selected' : 'choice-card'}
                >
                  <input
                    type='radio'
                    name={item.key}
                    checked={selected}
                    onChange={() => onSelect(item.key, option.value)}
                  />
                  <span>{option.label}</span>
                  <strong>{option.meta ?? formatScoreDelta(option.value)}</strong>
                </label>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
