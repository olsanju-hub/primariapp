import React, { useMemo, useState } from 'react'
import { ChoiceField } from '../components/CardioFieldCards'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getGlasgowBlatchfordAssessment, sumScore } from '../scoreUtils'

const sexOptions = [
  { value: 'male', label: 'Hombre', meta: 'Varón' },
  { value: 'female', label: 'Mujer', meta: 'Mujer' },
]

const baseItems = [
  {
    key: 'urea',
    label: 'Urea sérica',
    helper: 'La escala usa mmol/L; se muestran equivalencias aproximadas en mg/dL de urea.',
    options: [
      { label: 'Menor de 6,5 mmol/L (<39 mg/dL)', value: 0, meta: '0' },
      { label: '6,5 - 7,9 mmol/L (39 - 47 mg/dL)', value: 2, meta: '+2' },
      { label: '8,0 - 9,9 mmol/L (48 - 59 mg/dL)', value: 3, meta: '+3' },
      { label: '10 - 24,9 mmol/L (60 - 149 mg/dL)', value: 4, meta: '+4' },
      { label: '25 mmol/L o más (≥150 mg/dL)', value: 6, meta: '+6' },
    ],
  },
  {
    key: 'systolicBp',
    label: 'Presión arterial sistólica',
    options: [
      { label: '110 mmHg o más', value: 0, meta: '0' },
      { label: '100 - 109 mmHg', value: 1, meta: '+1' },
      { label: '90 - 99 mmHg', value: 2, meta: '+2' },
      { label: 'Menor de 90 mmHg', value: 3, meta: '+3' },
    ],
  },
  {
    key: 'pulse',
    label: 'Frecuencia cardiaca',
    options: [
      { label: 'Menor de 100 lpm', value: 0, meta: '0' },
      { label: '100 lpm o más', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'melena',
    label: 'Melenas',
    options: [
      { label: 'No', value: 0, meta: '0' },
      { label: 'Sí', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'syncope',
    label: 'Síncope',
    options: [
      { label: 'No', value: 0, meta: '0' },
      { label: 'Sí', value: 2, meta: '+2' },
    ],
  },
  {
    key: 'hepaticDisease',
    label: 'Hepatopatía conocida',
    options: [
      { label: 'No', value: 0, meta: '0' },
      { label: 'Sí', value: 2, meta: '+2' },
    ],
  },
  {
    key: 'heartFailure',
    label: 'Insuficiencia cardiaca conocida',
    options: [
      { label: 'No', value: 0, meta: '0' },
      { label: 'Sí', value: 2, meta: '+2' },
    ],
  },
]

function getHemoglobinItem(sex) {
  return {
    key: 'hemoglobin',
    label: 'Hemoglobina',
    helper: sex === 'male' ? 'Bandas para varón.' : 'Bandas para mujer.',
    options:
      sex === 'male'
        ? [
            { label: '13 g/dL o más', value: 0, meta: '0' },
            { label: '12 - 12,9 g/dL', value: 1, meta: '+1' },
            { label: '10 - 11,9 g/dL', value: 3, meta: '+3' },
            { label: 'Menor de 10 g/dL', value: 6, meta: '+6' },
          ]
        : [
            { label: '12 g/dL o más', value: 0, meta: '0' },
            { label: '10 - 11,9 g/dL', value: 1, meta: '+1' },
            { label: 'Menor de 10 g/dL', value: 6, meta: '+6' },
          ],
  }
}

export default function GlasgowBlatchford() {
  const [sex, setSex] = useState('male')
  const [answers, setAnswers] = useState({})

  const items = useMemo(
    () => [baseItems[0], getHemoglobinItem(sex), ...baseItems.slice(1)],
    [sex]
  )
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getGlasgowBlatchfordAssessment(total, complete)

  const valueMeaning = !complete
    ? 'La puntuación estima la probabilidad de requerir intervención hospitalaria o fallecer en una HDA.'
    : total <= 1
      ? 'Una puntuación de 0 a 1 identifica un perfil muy bajo riesgo en pacientes seleccionados y estables.'
      : 'Las puntuaciones crecientes se asocian a mayor necesidad probable de transfusión, endoscopia terapéutica o soporte hospitalario.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Digestivo'
      subsection='Hemorragia digestiva'
      status='Operativa'
      title='Glasgow-Blatchford'
      description='Escala preendoscópica para estratificación inicial en hemorragia digestiva alta.'
      clinicalUse='Ayuda a identificar perfiles de muy bajo riesgo y a estimar la necesidad de intervención hospitalaria.'
      whenToUse='Valoración inicial de hematemesis, melena o sospecha de hemorragia digestiva alta antes de la endoscopia.'
      whatIs='Escala preendoscópica para hemorragia digestiva alta.'
      whatFor='Sirve para ordenar el riesgo inicial y apoyar la decisión de ingreso, monitorización y urgencia endoscópica.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación GBS'
      scoreValue={complete ? `${total}` : 'Pendiente'}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa la versión clásica. El punto de corte de muy bajo riesgo se reserva a GBS 0-1 y siempre debe acompañarse de estabilidad clínica y buen contexto de seguimiento.'
      tone={tone}
    >
      <div className='question-grid'>
        <ChoiceField
          index={1}
          label='Sexo'
          helper='La banda de hemoglobina cambia según sexo.'
          options={sexOptions}
          value={sex}
          onChange={setSex}
          name='gbs-sex'
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
