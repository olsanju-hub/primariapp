import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import ToolPage from '../ToolPage'
import { getFrailAssessment, sumScore } from '../scoreUtils'

const criteria = [
  {
    key: 'fatigue',
    label: 'Fatiga la mayor parte o todo el tiempo en las últimas 4 semanas',
    value: 1,
  },
  {
    key: 'resistance',
    label: 'Dificultad para subir 10 escalones sin parar y sin ayudas',
    value: 1,
  },
  {
    key: 'ambulation',
    label: 'Dificultad para caminar varios cientos de metros sin ayudas',
    value: 1,
  },
  {
    key: 'illnesses',
    label: 'Cinco o más enfermedades crónicas de la lista FRAIL',
    value: 1,
  },
  {
    key: 'weightLoss',
    label: 'Pérdida de peso > 5% en el último año',
    value: 1,
  },
]

export default function FRAIL() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = criteria.every((criterion) => Object.hasOwn(answers, criterion.key))
  const { interpretation, conduct, tone } = getFrailAssessment(total, complete)
  const valueMeaning =
    complete && total === 0
      ? 'Un 0/5 indica ausencia de criterios de fragilidad en esta escala.'
      : 'La puntuación expresa carga de fragilidad: 0 robusto, 1-2 prefragilidad y 3-5 fragilidad.'

  const handleToggle = (criterion, checked) => {
    setAnswers((current) => ({
      ...current,
      [criterion.key]: checked ? criterion.value : 0,
    }))
  }

  return (
    <ToolPage
      specialty='Geriatría'
      subsection='Fragilidad'
      status='Operativa'
      title='FRAIL'
      description='Cribado ultrarrápido de fragilidad con cinco criterios clínicos sencillos.'
      clinicalUse='Permite detectar robustez, prefragilidad o fragilidad en pocos segundos.'
      whenToUse='Consulta geriátrica, atención primaria, hospitalización y revisión funcional global.'
      whatIs='Escala breve de fragilidad basada en 5 criterios clínicos.'
      whatFor='Sirve para cribado rápido de fragilidad y riesgo de deterioro funcional.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación total'
      scoreValue={`${total} / 5`}
      interpretation={interpretation}
      conduct={conduct}
      note='En “Illnesses” cuenta como positivo si acumula 5 o más enfermedades crónicas de la lista clásica: HTA, diabetes, cáncer no cutáneo menor, enfermedad pulmonar crónica, infarto, insuficiencia cardiaca, angina, asma, artritis, ictus o enfermedad renal.'
      tone={tone}
    >
      <BinaryCriteriaGrid answers={answers} criteria={criteria} onToggle={handleToggle} compact />
    </ToolPage>
  )
}
