import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import { getHasBledAssessment, sumScore } from '../scoreUtils'
import ToolPage from '../ToolPage'

const factors = [
  { key: 'hypertension', label: 'Hipertensión no controlada con PAS > 160 mmHg', value: 1 },
  {
    key: 'renal',
    label: 'Función renal alterada (diálisis, trasplante o creatinina muy elevada)',
    value: 1,
  },
  {
    key: 'liver',
    label: 'Función hepática alterada (cirrosis o alteración bioquímica marcada)',
    value: 1,
  },
  { key: 'stroke', label: 'Ictus previo', value: 1 },
  { key: 'bleeding', label: 'Sangrado previo o predisposición hemorrágica', value: 1 },
  { key: 'labileInr', label: 'INR lábil si está con antagonistas de vitamina K', value: 1 },
  { key: 'elderly', label: 'Edad > 65 años', value: 1 },
  { key: 'drugs', label: 'Fármacos concomitantes que aumentan sangrado (AINE/antiagregantes)', value: 1 },
  { key: 'alcohol', label: 'Consumo excesivo de alcohol', value: 1 },
]

export default function HASBLED() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const { interpretation, conduct, tone } = getHasBledAssessment(total)
  const valueMeaning =
    total <= 1
      ? 'Una puntuación baja sugiere menor riesgo hemorrágico anual por escala.'
      : total === 2
        ? 'Un valor intermedio obliga a revisar factores modificables y seguimiento.'
        : 'Una puntuación de 3 o más señala alto riesgo hemorrágico, pero no contraindica por sí sola anticoagular.'

  const handleToggle = (criterion, checked) => {
    setAnswers((current) => ({
      ...current,
      [criterion.key]: checked ? criterion.value : 0,
    }))
  }

  return (
    <ToolPage
      specialty='Cardiología'
      status='Operativa'
      title='HAS-BLED'
      description='Estratifica el riesgo hemorrágico en pacientes candidatos a anticoagulación.'
      clinicalUse='Sirve para detectar factores modificables y planificar seguimiento más seguro.'
      whenToUse='Antes y durante anticoagulación, siempre junto al contexto clínico global.'
      whatIs='Escala de riesgo hemorrágico para pacientes con fibrilación auricular.'
      whatFor='Ayuda a detectar factores corregibles y a ajustar la intensidad del seguimiento.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación total'
      scoreValue={`${total} / 9`}
      interpretation={interpretation}
      conduct={conduct}
      note='Una puntuación elevada no contraindica por sí sola anticoagular; obliga a corregir riesgos y vigilar mejor.'
      tone={tone}
    >
      <BinaryCriteriaGrid
        answers={answers}
        criteria={factors}
        onToggle={handleToggle}
        compact
      />
    </ToolPage>
  )
}
