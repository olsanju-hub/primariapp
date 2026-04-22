import React, { useMemo, useState } from 'react'
import { ChoiceField } from '../components/CardioFieldCards'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getAuditCAssessment, sumScore } from '../scoreUtils'

const sexOptions = [
  { value: 'female', label: 'Mujer', meta: '≥3' },
  { value: 'male', label: 'Hombre', meta: '≥4' },
]

const items = [
  {
    key: 'frequency',
    label: '¿Con qué frecuencia toma alguna bebida alcohólica?',
    options: [
      { label: 'Nunca', value: 0, meta: '0' },
      { label: 'Mensualmente o menos', value: 1, meta: '+1' },
      { label: '2 a 4 veces al mes', value: 2, meta: '+2' },
      { label: '2 a 3 veces por semana', value: 3, meta: '+3' },
      { label: '4 o más veces por semana', value: 4, meta: '+4' },
    ],
  },
  {
    key: 'quantity',
    label: 'Cuando bebe, ¿cuántas consumiciones toma en un día normal?',
    options: [
      { label: '1 o 2', value: 0, meta: '0' },
      { label: '3 o 4', value: 1, meta: '+1' },
      { label: '5 o 6', value: 2, meta: '+2' },
      { label: '7 a 9', value: 3, meta: '+3' },
      { label: '10 o más', value: 4, meta: '+4' },
    ],
  },
  {
    key: 'binge',
    label: '¿Con qué frecuencia toma 6 o más bebidas en una sola ocasión?',
    options: [
      { label: 'Nunca', value: 0, meta: '0' },
      { label: 'Menos de una vez al mes', value: 1, meta: '+1' },
      { label: 'Mensualmente', value: 2, meta: '+2' },
      { label: 'Semanalmente', value: 3, meta: '+3' },
      { label: 'A diario o casi a diario', value: 4, meta: '+4' },
    ],
  },
]

export default function AUDITC() {
  const [sex, setSex] = useState('female')
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getAuditCAssessment(total, sex, complete)
  const cutoff = sex === 'female' ? 3 : 4

  const valueMeaning = !complete
    ? 'La suma va de 0 a 12 y cuanto más alta sea, mayor probabilidad de consumo no saludable.'
    : total >= cutoff
      ? `Con el punto de corte habitual para ${sex === 'female' ? 'mujer' : 'hombre'}, el cribado es positivo.`
      : `La puntuación queda por debajo del punto de corte habitual para ${sex === 'female' ? 'mujer' : 'hombre'}.`

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Salud Mental'
      subsection='Alcohol'
      status='Operativa'
      title='AUDIT-C'
      description='Versión breve de 3 preguntas para cribado de consumo de alcohol no saludable.'
      clinicalUse='Ayuda a detectar de forma rápida consumo de riesgo antes de ampliar con entrevista o AUDIT completo.'
      whenToUse='Cribado oportunista, revisión de hábitos, consultas preventivas o sospecha de consumo problemático.'
      whatIs='Versión abreviada de consumo del AUDIT.'
      whatFor='Sirve para detectar consumo no saludable y decidir si conviene ampliar la evaluación del alcohol.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación AUDIT-C'
      scoreValue={`${total} / 12`}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usan los puntos de corte habituales: positivo con 3 o más en mujeres y 4 o más en hombres. Cuanto mayor es la puntuación, mayor es la probabilidad de daño relacionado con alcohol.'
      tone={tone}
    >
      <div className='question-grid'>
        <ChoiceField
          index={1}
          label='Sexo'
          helper='El punto de corte positivo cambia según sexo.'
          options={sexOptions}
          value={sex}
          onChange={setSex}
          name='auditc-sex'
          wide
        />
      </div>

      <ScoredChoiceGrid
        items={items}
        answers={answers}
        onSelect={handleSelect}
        startIndex={2}
        compact
      />
    </ToolPage>
  )
}
