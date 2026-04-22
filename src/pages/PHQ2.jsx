import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getPhq2Assessment, sumScore } from '../scoreUtils'

const frequencyOptions = [
  { label: 'Nada', value: 0, meta: '0' },
  { label: 'Varios días', value: 1, meta: '+1' },
  { label: 'Más de la mitad', value: 2, meta: '+2' },
  { label: 'Casi cada día', value: 3, meta: '+3' },
]

const items = [
  {
    key: 'anhedonia',
    label: 'Poco interés o placer en hacer cosas',
    options: frequencyOptions,
  },
  {
    key: 'mood',
    label: 'Sentirse decaído, deprimido o sin esperanza',
    options: frequencyOptions,
  },
]

export default function PHQ2() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getPhq2Assessment(total, complete)

  const valueMeaning = !complete
    ? 'La suma va de 0 a 6 y sirve para decidir si el cribado depresivo breve es positivo.'
    : total >= 3
      ? 'Una puntuación de 3 o más suele considerarse cribado depresivo positivo.'
      : 'Las puntuaciones bajas hacen menos probable un cribado depresivo positivo, aunque no sustituyen la entrevista clínica.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Salud Mental'
      subsection='Depresión'
      status='Operativa'
      title='PHQ-2'
      description='Cribado ultrabreve de síntomas depresivos nucleares en las últimas 2 semanas.'
      clinicalUse='Permite detectar rápidamente anhedonia y ánimo depresivo antes de ampliar la evaluación.'
      whenToUse='Consulta breve, cribado oportunista, revisión de malestar emocional o primer paso antes de PHQ-9.'
      whatIs='Versión de 2 ítems del Patient Health Questionnaire para depresión.'
      whatFor='Sirve para decidir si conviene ampliar el cribado depresivo con una valoración más completa.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación PHQ-2'
      scoreValue={`${total} / 6`}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa el punto de corte habitual de 3. Una puntuación de 2 puede justificar ampliar si la sospecha clínica sigue siendo relevante.'
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
