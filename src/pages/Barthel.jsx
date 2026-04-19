import React, { useMemo, useState } from 'react'
import ToolPage from '../ToolPage'

export default function Barthel() {
  const items = [
    { key: 'alimentacion', label: 'Alimentación', options: [{ t: 'Independiente', v: 10 }, { t: 'Necesita ayuda', v: 5 }, { t: 'Dependiente', v: 0 }] },
    { key: 'bano', label: 'Baño', options: [{ t: 'Independiente', v: 5 }, { t: 'Dependiente', v: 0 }] },
    { key: 'aseo', label: 'Aseo personal', options: [{ t: 'Independiente', v: 5 }, { t: 'Dependiente', v: 0 }] },
    { key: 'vestido', label: 'Vestido', options: [{ t: 'Independiente', v: 10 }, { t: 'Necesita ayuda', v: 5 }, { t: 'Dependiente', v: 0 }] },
    { key: 'deposicion', label: 'Deposición', options: [{ t: 'Continente', v: 10 }, { t: 'Accidental', v: 5 }, { t: 'Incontinente', v: 0 }] },
    { key: 'miccion', label: 'Micción', options: [{ t: 'Continente', v: 10 }, { t: 'Accidental', v: 5 }, { t: 'Incontinente', v: 0 }] },
    { key: 'retrete', label: 'Uso del retrete', options: [{ t: 'Independiente', v: 10 }, { t: 'Necesita ayuda', v: 5 }, { t: 'Dependiente', v: 0 }] },
    { key: 'transferencias', label: 'Transferencias', options: [{ t: 'Independiente', v: 15 }, { t: 'Pequeña ayuda', v: 10 }, { t: 'Gran ayuda', v: 5 }, { t: 'Dependiente', v: 0 }] },
    { key: 'deambulacion', label: 'Deambulación', options: [{ t: 'Independiente', v: 15 }, { t: 'Ayuda de una persona', v: 10 }, { t: 'Silla de ruedas', v: 5 }, { t: 'Incapaz', v: 0 }] },
    { key: 'escaleras', label: 'Escaleras', options: [{ t: 'Independiente', v: 10 }, { t: 'Necesita ayuda', v: 5 }, { t: 'Incapaz', v: 0 }] },
  ]

  const [answers, setAnswers] = useState({})
  const total = useMemo(() => Object.values(answers).reduce((sum, value) => sum + value, 0), [answers])

  const interpret = () => {
    if (total === 100) return 'Independencia total'
    if (total >= 60) return 'Dependencia leve'
    if (total >= 40) return 'Dependencia moderada'
    if (total >= 20) return 'Dependencia severa'
    return 'Dependencia total'
  }

  const conduct = () => {
    if (total === 100) {
      return 'Mantener actividad y revisar cambios funcionales en el seguimiento habitual.'
    }
    if (total >= 60) {
      return 'Planificar apoyo puntual, revisar caídas, adherencia terapéutica y recursos domiciliarios.'
    }
    if (total >= 40) {
      return 'Valorar intervención funcional, fisioterapia y necesidad de apoyo social estructurado.'
    }
    if (total >= 20) {
      return 'Coordinar cuidados intensivos, prevención de úlceras y evaluación geriátrica integral.'
    }
    return 'Priorizar planificación de cuidados, soporte del cuidador y revisión multidisciplinar.'
  }

  const tone = total >= 60 ? 'positive' : total >= 40 ? 'warning' : 'critical'

  return (
    <ToolPage
      specialty='Geriatría'
      title='Índice de Barthel'
      description='Escala funcional para actividades básicas de la vida diaria con lectura rápida del grado de dependencia.'
      clinicalUse='Valorar autonomía y apoyo requerido en seguimiento geriátrico.'
      whenToUse='Consulta de fragilidad, alta hospitalaria y planificación de cuidados.'
      scoreLabel='Puntuación total'
      scoreValue={`${total} / 100`}
      interpretation={interpret()}
      conduct={conduct()}
      note='Conviene reevaluar si cambian movilidad, continencia, entorno domiciliario o necesidad de cuidadores.'
      tone={tone}
    >
      <div className='question-grid'>
        {items.map((item, index) => (
          <section key={item.key} className='question-card'>
            <div className='question-card-head'>
              <span className='question-index'>{String(index + 1).padStart(2, '0')}</span>
              <h4>{item.label}</h4>
            </div>

            <div className='option-stack'>
              {item.options.map((option) => {
                const selected = answers[item.key] === option.v
                return (
                  <label
                    key={option.t}
                    className={selected ? 'choice-card choice-card--selected' : 'choice-card'}
                  >
                    <input
                      type='radio'
                      name={item.key}
                      checked={selected}
                      onChange={() => setAnswers((current) => ({ ...current, [item.key]: option.v }))}
                    />
                    <span>{option.t}</span>
                    <strong>+{option.v}</strong>
                  </label>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </ToolPage>
  )
}
