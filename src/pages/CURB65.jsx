import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import { getCurb65Assessment, sumScore } from '../scoreUtils'
import ToolPage from '../ToolPage'

const factors = [
  { key: 'confusion', label: 'Confusión nueva', value: 1 },
  { key: 'urea', label: 'Urea > 7 mmol/L', value: 1 },
  { key: 'respiratoryRate', label: 'Frecuencia respiratoria ≥ 30/min', value: 1 },
  { key: 'pressure', label: 'PAS < 90 o PAD ≤ 60 mmHg', value: 1 },
  { key: 'age', label: 'Edad ≥ 65 años', value: 1 },
]

export default function CURB65() {
  const [answers, setAnswers] = useState({})

  const total = useMemo(() => sumScore(answers), [answers])
  const { interpretation, conduct, tone } = getCurb65Assessment(total)

  const handleToggle = (criterion, checked) => {
    setAnswers((current) => ({
      ...current,
      [criterion.key]: checked ? criterion.value : 0,
    }))
  }

  return (
    <ToolPage
      specialty='Neumología'
      title='CURB-65'
      description='Estratificación rápida de gravedad en neumonía adquirida en la comunidad con dato analítico.'
      clinicalUse='Ayuda a decidir lugar de manejo, observación o ingreso.'
      whenToUse='Valoración inicial hospitalaria o cuando se dispone de urea.'
      scoreLabel='Puntuación CURB-65'
      scoreValue={`${total} / 5`}
      interpretation={interpretation}
      conduct={conduct}
      note='Si no dispones de urea, usa CRB-65 y completa la valoración con saturación, comorbilidad y juicio clínico.'
      tone={tone}
    >
      <BinaryCriteriaGrid answers={answers} criteria={factors} onToggle={handleToggle} compact />
    </ToolPage>
  )
}
