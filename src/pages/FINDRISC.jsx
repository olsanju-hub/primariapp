import React, { useMemo, useState } from 'react'
import { ChoiceField } from '../components/CardioFieldCards'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getFindriscAssessment, sumScore } from '../scoreUtils'

const sexOptions = [
  { value: 'male', label: 'Hombre', meta: 'Varón' },
  { value: 'female', label: 'Mujer', meta: 'Mujer' },
]

const baseItems = [
  {
    key: 'age',
    label: 'Edad',
    options: [
      { label: 'Menor de 45 años', value: 0, meta: '0' },
      { label: '45 - 54 años', value: 2, meta: '+2' },
      { label: '55 - 64 años', value: 3, meta: '+3' },
      { label: '65 años o más', value: 4, meta: '+4' },
    ],
  },
  {
    key: 'bmi',
    label: 'IMC',
    options: [
      { label: 'Menor de 25 kg/m²', value: 0, meta: '0' },
      { label: '25 - 30 kg/m²', value: 1, meta: '+1' },
      { label: 'Mayor de 30 kg/m²', value: 3, meta: '+3' },
    ],
  },
  {
    key: 'activity',
    label: 'Actividad física al menos 30 min/día',
    options: [
      { label: 'Sí', value: 0, meta: '0' },
      { label: 'No', value: 2, meta: '+2' },
    ],
  },
  {
    key: 'diet',
    label: 'Consume verduras o fruta cada día',
    options: [
      { label: 'Sí', value: 0, meta: '0' },
      { label: 'No', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'medication',
    label: 'Tratamiento antihipertensivo',
    options: [
      { label: 'No', value: 0, meta: '0' },
      { label: 'Sí', value: 2, meta: '+2' },
    ],
  },
  {
    key: 'glucose',
    label: 'Antecedente de glucemia elevada',
    helper: 'Incluye analítica previa, enfermedad aguda o embarazo.',
    options: [
      { label: 'No', value: 0, meta: '0' },
      { label: 'Sí', value: 5, meta: '+5' },
    ],
  },
  {
    key: 'family',
    label: 'Antecedentes familiares de diabetes',
    options: [
      { label: 'No', value: 0, meta: '0' },
      { label: 'Segundo grado', value: 3, meta: '+3' },
      { label: 'Primer grado', value: 5, meta: '+5' },
    ],
  },
]

function getWaistItem(sex) {
  return {
    key: 'waist',
    label: 'Perímetro abdominal',
    helper:
      sex === 'male'
        ? 'Usa los puntos de corte para varón.'
        : 'Usa los puntos de corte para mujer.',
    options:
      sex === 'male'
        ? [
            { label: 'Menor de 94 cm', value: 0, meta: '0' },
            { label: '94 - 102 cm', value: 3, meta: '+3' },
            { label: 'Mayor de 102 cm', value: 4, meta: '+4' },
          ]
        : [
            { label: 'Menor de 80 cm', value: 0, meta: '0' },
            { label: '80 - 88 cm', value: 3, meta: '+3' },
            { label: 'Mayor de 88 cm', value: 4, meta: '+4' },
          ],
  }
}

export default function FINDRISC() {
  const [sex, setSex] = useState('male')
  const [answers, setAnswers] = useState({})

  const items = useMemo(
    () => [baseItems[0], baseItems[1], getWaistItem(sex), ...baseItems.slice(2)],
    [sex]
  )

  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getFindriscAssessment(total, complete)
  const valueMeaning = complete
    ? total < 7
      ? 'La probabilidad estimada a 10 años es baja.'
      : total >= 20
        ? 'La probabilidad estimada a 10 años es muy alta.'
        : 'La probabilidad estimada aumenta por escalones conforme sube la puntuación.'
    : 'La puntuación total refleja riesgo estimado de diabetes tipo 2 a 10 años en población general.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Atención Primaria'
      subsection='Riesgo metabólico'
      status='Operativa'
      title='FINDRISC'
      description='Cuestionario validado para estimar riesgo de diabetes tipo 2 a 10 años.'
      clinicalUse='Ayuda a priorizar cribado glucémico, consejo sobre estilo de vida y seguimiento metabólico.'
      whenToUse='Prevención, obesidad, HTA, riesgo cardiometabólico o revisión de factores de riesgo.'
      whatIs='Escala de riesgo de diabetes tipo 2 a 10 años.'
      whatFor='Sirve para identificar personas que se benefician de cribado y prevención intensiva.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación FINDRISC'
      scoreValue={`${total} / 26`}
      interpretation={interpretation}
      conduct={conduct}
      note='No diagnostica diabetes. Si el riesgo es moderado o mayor, integra el resultado con glucemia, HbA1c, peso, presión arterial y contexto clínico.'
      tone={tone}
    >
      <div className='question-grid'>
        <ChoiceField
          index={1}
          label='Sexo'
          helper='Solo modifica los puntos de corte del perímetro abdominal.'
          options={sexOptions}
          value={sex}
          onChange={setSex}
          name='findrisc-sex'
          wide
        />
      </div>

      <ScoredChoiceGrid
        items={items}
        answers={answers}
        onSelect={handleSelect}
        startIndex={2}
      />
    </ToolPage>
  )
}
