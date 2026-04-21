import React from 'react'

export default function LikertScaleGrid({
  items,
  answers,
  onSelect,
  startIndex = 1,
}) {
  return (
    <div className='likert-list'>
      {items.map((item, index) => (
        <section key={item.key} className='question-card question-card--wide likert-card'>
          <div className='question-card-head'>
            <span className='question-index'>
              {String(index + startIndex).padStart(2, '0')}
            </span>

            <div>
              <h4>{item.label}</h4>
              {item.helper ? <p className='question-helper'>{item.helper}</p> : null}
            </div>
          </div>

          <div className='likert-scale'>
            <div className='likert-anchors'>
              <span className='likert-anchor'>{item.leftLabel}</span>
              <span className='likert-anchor likert-anchor--end'>{item.rightLabel}</span>
            </div>

            <div className='likert-options' role='radiogroup' aria-label={item.label}>
              {[0, 1, 2, 3, 4, 5].map((value) => {
                const selected = answers[item.key] === value

                return (
                  <label
                    key={`${item.key}-${value}`}
                    className={selected ? 'likert-option likert-option--selected' : 'likert-option'}
                  >
                    <input
                      type='radio'
                      name={item.key}
                      checked={selected}
                      onChange={() => onSelect(item.key, value)}
                    />
                    <span>{value}</span>
                  </label>
                )
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
