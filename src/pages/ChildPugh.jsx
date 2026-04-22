import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getChildPughAssessment, sumScore } from '../scoreUtils'

const items = [
  {
    key: 'bilirubin',
    label: 'Bilirrubina total',
    helper: 'Versión clásica no colestásica.',
    options: [
      { label: 'Menor de 2 mg/dL (<34 µmol/L)', value: 1, meta: '+1' },
      { label: '2 - 3 mg/dL (34 - 50 µmol/L)', value: 2, meta: '+2' },
      { label: 'Mayor de 3 mg/dL (>50 µmol/L)', value: 3, meta: '+3' },
    ],
  },
  {
    key: 'albumin',
    label: 'Albúmina',
    options: [
      { label: 'Mayor de 3,5 g/dL', value: 1, meta: '+1' },
      { label: '2,8 - 3,5 g/dL', value: 2, meta: '+2' },
      { label: 'Menor de 2,8 g/dL', value: 3, meta: '+3' },
    ],
  },
  {
    key: 'inr',
    label: 'INR',
    options: [
      { label: 'Menor de 1,7', value: 1, meta: '+1' },
      { label: '1,7 - 2,3', value: 2, meta: '+2' },
      { label: 'Mayor de 2,3', value: 3, meta: '+3' },
    ],
  },
  {
    key: 'ascites',
    label: 'Ascitis',
    options: [
      { label: 'Ausente', value: 1, meta: '+1' },
      { label: 'Leve o controlada', value: 2, meta: '+2' },
      { label: 'Moderada-grave o refractaria', value: 3, meta: '+3' },
    ],
  },
  {
    key: 'encephalopathy',
    label: 'Encefalopatía hepática',
    options: [
      { label: 'Ausente', value: 1, meta: '+1' },
      { label: 'Grado I-II o controlada', value: 2, meta: '+2' },
      { label: 'Grado III-IV o refractaria', value: 3, meta: '+3' },
    ],
  },
]

export default function ChildPugh() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone, childClass } = getChildPughAssessment(total, complete)

  const valueMeaning = !complete
    ? 'La suma clasifica la hepatopatía en clases A, B o C según gravedad y pronóstico.'
    : childClass === 'A'
      ? 'Clase A corresponde a menor gravedad dentro de la escala.'
      : childClass === 'B'
        ? 'Clase B expresa disfunción hepática clínicamente relevante.'
        : 'Clase C refleja afectación hepática avanzada y peor pronóstico global.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Digestivo'
      subsection='Hepatopatía'
      status='Operativa'
      title='Child-Pugh'
      description='Clasificación clásica para estratificar gravedad y pronóstico en cirrosis.'
      clinicalUse='Orienta gravedad hepática, pronóstico global y decisiones clínicas junto a la valoración completa del paciente.'
      whenToUse='Cirrosis o hepatopatía crónica avanzada cuando se quiere resumir gravedad funcional hepática.'
      whatIs='Escala clínico-analítica de gravedad en cirrosis.'
      whatFor='Sirve para clasificar la hepatopatía en clases A, B o C y contextualizar pronóstico.'
      valueMeaning={valueMeaning}
      scoreLabel='Clasificación Child-Pugh'
      scoreValue={complete ? `${total} / 15 · Clase ${childClass}` : 'Pendiente'}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa la versión clásica no colestásica con bilirrubina total, albúmina, INR, ascitis y encefalopatía. No sustituye MELD ni adaptaciones específicas para hepatopatías colestásicas.'
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
