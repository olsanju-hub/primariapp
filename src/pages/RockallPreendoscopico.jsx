import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getRockallPreendoscopicAssessment, sumScore } from '../scoreUtils'

const items = [
  {
    key: 'age',
    label: 'Edad',
    options: [
      { label: 'Menor de 60 años', value: 0, meta: '0' },
      { label: '60 - 79 años', value: 1, meta: '+1' },
      { label: '80 años o más', value: 2, meta: '+2' },
    ],
  },
  {
    key: 'shock',
    label: 'Situación hemodinámica',
    options: [
      { label: 'Sin shock: PAS ≥100 y FC <100', value: 0, meta: '0' },
      { label: 'Taquicardia: PAS ≥100 y FC ≥100', value: 1, meta: '+1' },
      { label: 'Hipotensión: PAS <100', value: 2, meta: '+2' },
    ],
  },
  {
    key: 'comorbidity',
    label: 'Comorbilidad',
    options: [
      { label: 'Sin comorbilidad mayor', value: 0, meta: '0' },
      {
        label: 'Cardiopatía isquémica, insuficiencia cardiaca u otra comorbilidad mayor',
        value: 2,
        meta: '+2',
      },
      {
        label: 'Insuficiencia renal, insuficiencia hepática o neoplasia diseminada',
        value: 3,
        meta: '+3',
      },
    ],
  },
]

export default function RockallPreendoscopico() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getRockallPreendoscopicAssessment(total, complete)

  const valueMeaning = !complete
    ? 'La puntuación resume riesgo clínico basal antes de conocer la endoscopia.'
    : total === 0
      ? 'Un valor 0 se asocia a riesgo clínico basal bajo, aunque no sustituye la evolución posterior.'
      : 'Puntuaciones más altas expresan mayor carga de edad, shock o comorbilidad y apoyan una vigilancia más estrecha.'

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
      title='Rockall preendoscópico'
      description='Versión clínica de Rockall para estimación de riesgo basal antes de la endoscopia.'
      clinicalUse='Orienta la gravedad inicial en hemorragia digestiva alta a partir de edad, shock y comorbilidad.'
      whenToUse='Evaluación inicial de HDA antes de disponer del diagnóstico y estigmas endoscópicos.'
      whatIs='Versión preendoscópica del score de Rockall.'
      whatFor='Sirve para valorar el riesgo clínico basal antes de completar la estratificación endoscópica.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación Rockall'
      scoreValue={complete ? `${total} / 7` : 'Pendiente'}
      interpretation={interpretation}
      conduct={conduct}
      note='Se implementa la parte clínica previa a la endoscopia. Para identificar pacientes de muy bajo riesgo de alta suele ser más útil Glasgow-Blatchford.'
      tone={tone}
    >
      <ScoredChoiceGrid
        items={items}
        answers={answers}
        onSelect={handleSelect}
      />
    </ToolPage>
  )
}
