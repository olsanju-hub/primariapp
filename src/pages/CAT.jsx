import React, { useMemo, useState } from 'react'
import LikertScaleGrid from '../components/LikertScaleGrid'
import ToolPage from '../ToolPage'
import { getCatAssessment, sumScore } from '../scoreUtils'

const items = [
  {
    key: 'cough',
    label: 'Tos',
    leftLabel: 'No toso',
    rightLabel: 'Toso todo el tiempo',
  },
  {
    key: 'phlegm',
    label: 'Expectoración',
    leftLabel: 'No tengo flemas en el pecho',
    rightLabel: 'Tengo el pecho lleno de flemas',
  },
  {
    key: 'tightness',
    label: 'Opresión torácica',
    leftLabel: 'No noto opresión en el pecho',
    rightLabel: 'Noto mucha opresión en el pecho',
  },
  {
    key: 'breathless',
    label: 'Disnea al subir una cuesta o un piso de escaleras',
    leftLabel: 'No me falta el aire',
    rightLabel: 'Me falta muchísimo el aire',
  },
  {
    key: 'activities',
    label: 'Limitación de actividades en casa',
    leftLabel: 'No me limita nada',
    rightLabel: 'Me limita mucho',
  },
  {
    key: 'confidence',
    label: 'Confianza para salir de casa',
    leftLabel: 'Salgo de casa con confianza',
    rightLabel: 'No tengo nada de confianza para salir',
  },
  {
    key: 'sleep',
    label: 'Sueño',
    leftLabel: 'Duermo bien',
    rightLabel: 'Duermo mal por mi problema respiratorio',
  },
  {
    key: 'energy',
    label: 'Energía',
    leftLabel: 'Tengo mucha energía',
    rightLabel: 'No tengo nada de energía',
  },
]

export default function CAT() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getCatAssessment(total, complete)
  const valueMeaning = complete
    ? total <= 10
      ? 'Una puntuación baja sugiere menor impacto sintomático global.'
      : total >= 21
        ? 'Una puntuación alta refleja impacto clínico relevante sobre la vida diaria.'
        : 'La puntuación intermedia indica impacto sintomático apreciable y seguimiento útil.'
    : 'El CAT suma 8 dominios de 0 a 5; a mayor puntuación, mayor impacto de la enfermedad respiratoria.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Neumología'
      subsection='Disnea y síntomas'
      status='Operativa'
      title='CAT'
      description='Cuestionario breve para estimar el impacto sintomático respiratorio global.'
      clinicalUse='Ayuda a cuantificar carga de síntomas y limitación funcional, especialmente en EPOC.'
      whenToUse='Seguimiento respiratorio, valoración basal y control evolutivo de síntomas.'
      whatIs='Cuestionario de 8 dominios sobre carga sintomática respiratoria.'
      whatFor='Sirve para medir cuánto impactan los síntomas en la vida diaria.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación CAT'
      scoreValue={`${total} / 40`}
      interpretation={interpretation}
      conduct={conduct}
      note='El resultado complementa la valoración clínica. En EPOC, una puntuación de 10 o más suele indicar mayor carga sintomática.'
      tone={tone}
    >
      <LikertScaleGrid items={items} answers={answers} onSelect={handleSelect} />
    </ToolPage>
  )
}
