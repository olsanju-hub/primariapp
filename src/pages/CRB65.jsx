import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import { getCrb65Assessment, sumScore } from '../scoreUtils'
import ToolPage from '../ToolPage'

const factors = [
  { key: 'confusion', label: 'Confusión nueva', value: 1 },
  { key: 'respiratoryRate', label: 'Frecuencia respiratoria ≥ 30/min', value: 1 },
  { key: 'pressure', label: 'PAS < 90 o PAD ≤ 60 mmHg', value: 1 },
  { key: 'age', label: 'Edad ≥ 65 años', value: 1 },
]

export default function CRB65() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const { interpretation, conduct, tone } = getCrb65Assessment(total)
  const valueMeaning =
    total === 0
      ? 'Una puntuación de 0 sugiere menor riesgo y suele favorecer manejo ambulatorio si el contexto acompaña.'
      : total === 1
        ? 'Una puntuación de 1 eleva el riesgo y obliga a valorar soporte, comorbilidad e hipoxemia.'
        : 'Puntuaciones de 2 o más se asocian a mayor gravedad y suelen justificar valoración hospitalaria.'

  const handleToggle = (criterion, checked) => {
    setAnswers((current) => ({
      ...current,
      [criterion.key]: checked ? criterion.value : 0,
    }))
  }

  return (
    <ToolPage
      specialty='Neumología'
      subsection='Neumonía'
      status='Operativa'
      title='CRB-65'
      description='Estratificación ultrarrápida de gravedad en neumonía adquirida en la comunidad sin analítica.'
      clinicalUse='Apoya la decisión de manejo ambulatorio, derivación o ingreso.'
      whenToUse='Valoración inicial en consulta, urgencias o dispositivo extrahospitalario.'
      whatIs='Escala clínica breve para estimar gravedad en neumonía adquirida en la comunidad.'
      whatFor='Ayuda a decidir si el paciente puede manejarse fuera del hospital o necesita derivación.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación CRB-65'
      scoreValue={`${total} / 4`}
      interpretation={interpretation}
      conduct={conduct}
      note='No sustituye hipoxemia, comorbilidad, fragilidad, situación basal ni sospecha de sepsis.'
      tone={tone}
    >
      <BinaryCriteriaGrid answers={answers} criteria={factors} onToggle={handleToggle} compact />
    </ToolPage>
  )
}
