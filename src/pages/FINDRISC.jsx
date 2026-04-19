import React, { useMemo, useState } from 'react'
import ToolPage from '../ToolPage'

export default function FINDRISC() {
  const items = [
    {
      key: 'age',
      label: 'Edad',
      options: [
        { label: 'Menor de 45 años', value: 0 },
        { label: '45 - 54 años', value: 2 },
        { label: '55 - 64 años', value: 3 },
        { label: '65 años o más', value: 4 },
      ],
    },
    {
      key: 'bmi',
      label: 'IMC',
      options: [
        { label: 'Menor de 25 kg/m²', value: 0 },
        { label: '25 - 30 kg/m²', value: 1 },
        { label: 'Mayor de 30 kg/m²', value: 3 },
      ],
    },
    {
      key: 'waist',
      label: 'Perímetro abdominal',
      options: [
        { label: 'Normal', value: 0 },
        { label: 'Intermedio', value: 3 },
        { label: 'Elevado', value: 4 },
      ],
    },
    {
      key: 'activity',
      label: 'Actividad física ≥ 30 min/día',
      options: [
        { label: 'Sí', value: 0 },
        { label: 'No', value: 2 },
      ],
    },
    {
      key: 'diet',
      label: 'Verdura o fruta diaria',
      options: [
        { label: 'Sí', value: 0 },
        { label: 'No', value: 1 },
      ],
    },
    {
      key: 'medication',
      label: 'Tratamiento antihipertensivo',
      options: [
        { label: 'No', value: 0 },
        { label: 'Sí', value: 2 },
      ],
    },
    {
      key: 'glucose',
      label: 'Antecedente de glucemia elevada',
      options: [
        { label: 'No', value: 0 },
        { label: 'Sí', value: 5 },
      ],
    },
    {
      key: 'family',
      label: 'Antecedentes familiares de diabetes',
      options: [
        { label: 'No', value: 0 },
        { label: 'Segundo grado', value: 3 },
        { label: 'Primer grado', value: 5 },
      ],
    },
  ]

  const [answers, setAnswers] = useState({})
  const total = useMemo(
    () => Object.values(answers).reduce((sum, value) => sum + value, 0),
    [answers]
  )

  const interpretation = () => {
    if (total < 7) return 'Riesgo bajo'
    if (total < 12) return 'Riesgo ligeramente elevado'
    if (total < 15) return 'Riesgo moderado'
    if (total < 21) return 'Riesgo alto'
    return 'Riesgo muy alto'
  }

  const conduct = () => {
    if (total < 7) return 'Reforzar hábitos saludables y reevaluar según evolución clínica.'
    if (total < 12) return 'Aconsejar cambios de estilo de vida y revisar factores metabólicos.'
    if (total < 15) return 'Valorar cribado glucémico y seguimiento más estructurado.'
    if (total < 21) return 'Priorizar intervención intensiva sobre peso, ejercicio y cribado analítico.'
    return 'Muy alto riesgo: completar estudio metabólico y plan preventivo activo.'
  }

  const tone = total >= 21 ? 'critical' : total >= 15 ? 'warning' : total >= 7 ? 'neutral' : 'positive'

  return (
    <ToolPage
      specialty='Atención Primaria'
      title='FINDRISC'
      description='Cuestionario validado para estimar riesgo de diabetes tipo 2 a 10 años.'
      clinicalUse='Ayuda a priorizar cribado, consejo y seguimiento de riesgo metabólico.'
      whenToUse='Consulta preventiva, obesidad, HTA o disglucemia sospechada.'
      scoreLabel='Puntuación FINDRISC'
      scoreValue={`${total}`}
      interpretation={interpretation()}
      conduct={conduct()}
      note='Combínalo con antecedentes, presión arterial, perfil lipídico y glucemia cuando corresponda.'
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
              {item.options.map((option) => (
                <label
                  key={option.label}
                  className={
                    answers[item.key] === option.value
                      ? 'choice-card choice-card--selected'
                      : 'choice-card'
                  }
                >
                  <input
                    type='radio'
                    name={item.key}
                    checked={answers[item.key] === option.value}
                    onChange={() =>
                      setAnswers((current) => ({
                        ...current,
                        [item.key]: option.value,
                      }))
                    }
                  />
                  <span>{option.label}</span>
                  <strong>{option.value > 0 ? `+${option.value}` : option.value}</strong>
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ToolPage>
  )
}
