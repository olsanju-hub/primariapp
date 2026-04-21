import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import {
  formatNumericScore,
  getWellsTepAssessment,
  sumScore,
} from '../scoreUtils'
import ToolPage from '../ToolPage'

const factors = [
  {
    key: 'clinicalDvt',
    label:
      'Signos o síntomas clínicos de TVP (mínimo edema de pierna y dolor a la palpación venosa profunda)',
    value: 3,
  },
  {
    key: 'alternativeDiagnosis',
    label: 'El TEP es más probable que un diagnóstico alternativo',
    value: 3,
  },
  { key: 'heartRate', label: 'Frecuencia cardiaca > 100 lpm', value: 1.5 },
  {
    key: 'immobilization',
    label: 'Inmovilización > 3 días o cirugía en las 4 semanas previas',
    value: 1.5,
  },
  { key: 'previousVte', label: 'TVP o TEP previos', value: 1.5 },
  { key: 'hemoptysis', label: 'Hemoptisis', value: 1 },
  {
    key: 'malignancy',
    label: 'Malignidad activa, tratada en los últimos 6 meses o paliativa',
    value: 1,
  },
]

export default function WellsTEP() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const { interpretation, conduct, tone } = getWellsTepAssessment(total)
  const valueMeaning =
    total > 4
      ? 'Más de 4 puntos hace probable el TEP en la versión dicotómica y suele llevar directamente a imagen.'
      : 'Con 4 puntos o menos el TEP no queda excluido; habitualmente se continúa con dímero-D si procede.'

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
      title='Wells TEP'
      description='Estimación clínica pretest de tromboembolismo pulmonar con la versión dicotómica de Wells.'
      clinicalUse='Ordena el paso a dímero-D o imagen según la probabilidad clínica inicial.'
      whenToUse='Sospecha de TEP en urgencias o valoración aguda antes de completar estudio diagnóstico.'
      whatIs='Regla clínica de probabilidad pretest para tromboembolismo pulmonar.'
      whatFor='Ayuda a decidir si continuar con dímero-D o pasar directamente a imagen.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación Wells'
      scoreValue={formatNumericScore(total)}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa la versión dicotómica recomendada por NICE: TEP probable si la puntuación es > 4.'
      tone={tone}
    >
      <BinaryCriteriaGrid answers={answers} criteria={factors} onToggle={handleToggle} />
    </ToolPage>
  )
}
