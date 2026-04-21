import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import {
  formatNumericScore,
  getWellsTvpAssessment,
  sumScore,
} from '../scoreUtils'
import ToolPage from '../ToolPage'

const factors = [
  { key: 'activeCancer', label: 'Cáncer activo (tratamiento en curso, < 6 meses o paliativo)', value: 1 },
  {
    key: 'paralysis',
    label: 'Parálisis, paresia o inmovilización con yeso reciente en extremidad inferior',
    value: 1,
  },
  {
    key: 'bedrest',
    label: 'Encamamiento reciente > 3 días o cirugía mayor < 12 semanas con anestesia',
    value: 1,
  },
  { key: 'tenderness', label: 'Dolor localizado a lo largo del sistema venoso profundo', value: 1 },
  { key: 'entireLeg', label: 'Tumefacción de toda la pierna', value: 1 },
  { key: 'calfDifference', label: 'Pantorrilla ≥ 3 cm mayor que la contralateral', value: 1 },
  { key: 'pittingEdema', label: 'Edema con fóvea limitado a la pierna sintomática', value: 1 },
  { key: 'collateralVeins', label: 'Venas superficiales colaterales no varicosas', value: 1 },
  { key: 'previousDvt', label: 'TVP previamente documentada', value: 1 },
  {
    key: 'alternativeDiagnosis',
    label: 'Hay un diagnóstico alternativo al menos tan probable como TVP',
    value: -2,
    selectionLabel: 'Diagnóstico alternativo presente',
  },
]

export default function WellsTVP() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const { interpretation, conduct, tone } = getWellsTvpAssessment(total)
  const valueMeaning =
    total >= 2
      ? 'Una puntuación de 2 o más hace probable la TVP en la versión dicotómica y suele llevar a ecografía.'
      : 'Una puntuación de 1 o menos hace menos probable la TVP, pero no la excluye sin completar el algoritmo.'

  const handleToggle = (criterion, checked) => {
    setAnswers((current) => ({
      ...current,
      [criterion.key]: checked ? criterion.value : 0,
    }))
  }

  return (
    <ToolPage
      specialty='Urgencias'
      subsection='Tromboembolia'
      status='Operativa'
      title='Wells TVP'
      description='Estimación rápida de probabilidad clínica pretest de trombosis venosa profunda.'
      clinicalUse='Ayuda a decidir pruebas complementarias y priorización diagnóstica.'
      whenToUse='Dolor, edema o asimetría de extremidad inferior con sospecha de TVP.'
      whatIs='Regla clínica para estimar la probabilidad pretest de trombosis venosa profunda.'
      whatFor='Sirve para decidir cuándo pedir dímero-D y cuándo pasar directamente a ecografía.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación Wells'
      scoreValue={formatNumericScore(total)}
      interpretation={interpretation}
      conduct={conduct}
      note='Debe integrarse con dímero-D, ecografía y probabilidad clínica global.'
      tone={tone}
    >
      <BinaryCriteriaGrid answers={answers} criteria={factors} onToggle={handleToggle} />
    </ToolPage>
  )
}
