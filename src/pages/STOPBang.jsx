import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getStopBangAssessment, sumScore } from '../scoreUtils'

const yesNoOptions = [
  { label: 'No', value: 0, meta: '0' },
  { label: 'Sí', value: 1, meta: '+1' },
]

const items = [
  {
    key: 'snoring',
    label: 'Ronquidos intensos',
    helper: '¿Ronca fuerte, más que hablar o con la puerta cerrada?',
    options: yesNoOptions,
  },
  {
    key: 'tired',
    label: 'Somnolencia o cansancio diurno',
    options: yesNoOptions,
  },
  {
    key: 'observed',
    label: 'Apneas observadas durante el sueño',
    options: yesNoOptions,
  },
  {
    key: 'pressure',
    label: 'Hipertensión arterial',
    options: yesNoOptions,
  },
  {
    key: 'bmi',
    label: 'IMC > 35 kg/m²',
    options: yesNoOptions,
  },
  {
    key: 'age',
    label: 'Edad > 50 años',
    options: yesNoOptions,
  },
  {
    key: 'neck',
    label: 'Perímetro cervical > 40 cm',
    options: yesNoOptions,
  },
  {
    key: 'gender',
    label: 'Sexo masculino',
    options: yesNoOptions,
  },
]

export default function STOPBang() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getStopBangAssessment(total, complete)
  const valueMeaning = complete
    ? total <= 2
      ? 'Una puntuación de 0 a 2 se asocia a bajo riesgo.'
      : total >= 5
        ? 'Una puntuación de 5 a 8 se asocia a alto riesgo de apnea obstructiva del sueño.'
        : 'Las puntuaciones de 3 a 4 indican riesgo intermedio y suelen justificar mayor valoración.'
    : 'La puntuación va de 0 a 8; cuantos más criterios positivos, mayor riesgo de apnea obstructiva del sueño.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Neumología'
      subsection='Sueño y apnea'
      status='Operativa'
      title='STOP-BANG'
      description='Cribado rápido de riesgo de apnea obstructiva del sueño mediante 8 criterios clínicos.'
      clinicalUse='Ayuda a identificar pacientes con riesgo de SAOS que precisan estudio adicional.'
      whenToUse='Consulta respiratoria, sueño, atención primaria, preoperatorio o cribado clínico dirigido.'
      whatIs='Cuestionario breve de cribado para apnea obstructiva del sueño.'
      whatFor='Sirve para estimar la probabilidad de SAOS y decidir si ampliar estudio.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación STOP-BANG'
      scoreValue={`${total} / 8`}
      interpretation={interpretation}
      conduct={conduct}
      note='El cuestionario orienta riesgo, no confirma diagnóstico. Integra el resultado con somnolencia, comorbilidad y criterios de derivación o polisomnografía.'
      tone={tone}
    >
      <ScoredChoiceGrid items={items} answers={answers} onSelect={handleSelect} compact />
    </ToolPage>
  )
}
