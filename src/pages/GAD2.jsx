import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getGad2Assessment, sumScore } from '../scoreUtils'

const frequencyOptions = [
  { label: 'Nada', value: 0, meta: '0' },
  { label: 'Varios días', value: 1, meta: '+1' },
  { label: 'Más de la mitad', value: 2, meta: '+2' },
  { label: 'Casi cada día', value: 3, meta: '+3' },
]

const items = [
  {
    key: 'nervous',
    label: 'Sentirse nervioso, ansioso o con los nervios de punta',
    options: frequencyOptions,
  },
  {
    key: 'worry',
    label: 'No poder parar o controlar la preocupación',
    options: frequencyOptions,
  },
]

export default function GAD2() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getGad2Assessment(total, complete)

  const valueMeaning = !complete
    ? 'La suma va de 0 a 6 y ayuda a decidir si el cribado ansioso breve es positivo.'
    : total >= 3
      ? 'Una puntuación de 3 o más suele considerarse cribado ansioso positivo.'
      : 'Las puntuaciones bajas hacen menos probable un cribado ansioso positivo, aunque no excluyen malestar relevante.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Salud Mental'
      subsection='Ansiedad'
      status='Operativa'
      title='GAD-2'
      description='Cribado ultrabreve de síntomas ansiosos nucleares en las últimas 2 semanas.'
      clinicalUse='Permite detectar rápidamente ansiedad relevante antes de ampliar la evaluación.'
      whenToUse='Consulta breve, cribado oportunista, revisión de preocupación persistente o primer paso antes de GAD-7.'
      whatIs='Versión de 2 ítems del Generalized Anxiety Disorder screener.'
      whatFor='Sirve para decidir si conviene ampliar el cribado ansioso con una valoración más completa.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación GAD-2'
      scoreValue={`${total} / 6`}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa el punto de corte habitual de 3. Si la clínica es sugestiva, una puntuación menor no debe frenar una evaluación más amplia.'
      tone={tone}
    >
      <ScoredChoiceGrid
        items={items}
        answers={answers}
        onSelect={handleSelect}
        compact
      />
    </ToolPage>
  )
}
