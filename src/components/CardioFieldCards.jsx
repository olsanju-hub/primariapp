import React from 'react'

export function ChoiceField({
  index,
  label,
  helper,
  options,
  value,
  onChange,
  name,
  wide = false,
}) {
  return (
    <section className={wide ? 'question-card question-card--wide' : 'question-card'}>
      <div className='question-card-head'>
        <span className='question-index'>{String(index).padStart(2, '0')}</span>
        <div>
          <h4>{label}</h4>
          {helper ? <p className='question-helper'>{helper}</p> : null}
        </div>
      </div>

      <div className='option-stack option-stack--inline'>
        {options.map((option) => (
          <label
            key={`${name}-${option.value}`}
            className={value === option.value ? 'choice-card choice-card--selected' : 'choice-card'}
          >
            <input
              type='radio'
              name={name}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
            <strong>{option.meta ?? 'Elegir'}</strong>
          </label>
        ))}
      </div>
    </section>
  )
}

export function NumberField({
  index,
  label,
  helper,
  value,
  onChange,
  placeholder,
  unit,
  step = '1',
  min = '0',
  wide = false,
  note,
}) {
  return (
    <section className={wide ? 'question-card question-card--wide' : 'question-card'}>
      <div className='question-card-head'>
        <span className='question-index'>{String(index).padStart(2, '0')}</span>
        <div>
          <h4>{label}</h4>
          {helper ? <p className='question-helper'>{helper}</p> : null}
        </div>
      </div>

      <label className='metric-input'>
        <input
          type='number'
          min={min}
          step={step}
          inputMode='decimal'
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
        <span>{unit}</span>
      </label>

      {note ? <div className='metric-inline-note'>{note}</div> : null}
    </section>
  )
}
