import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import {
  formatNumericScore,
  getSimplifiedGenevaAssessment,
  sumScore,
} from '../scoreUtils'
import ToolPage from '../ToolPage'

const heartRateOptions = [
  { id: 'lt75', label: '< 75 lpm', points: 0 },
  { id: '75to94', label: '75 - 94 lpm', points: 1 },
  { id: 'gte95', label: '≥ 95 lpm', points: 2 },
]

const factors = [
  { key: 'age', label: 'Edad > 65 años', value: 1 },
  { key: 'previousVte', label: 'TVP o TEP previos', value: 1 },
  { key: 'recentSurgery', label: 'Cirugía o fractura en el último mes', value: 1 },
  { key: 'malignancy', label: 'Malignidad activa', value: 1 },
  { key: 'unilateralPain', label: 'Dolor unilateral en extremidad inferior', value: 1 },
  { key: 'hemoptysis', label: 'Hemoptisis', value: 1 },
  {
    key: 'dvtSigns',
    label: 'Dolor a la palpación venosa profunda y edema unilateral',
    value: 1,
  },
]

export default function SimplifiedGeneva() {
  const [heartRate, setHeartRate] = useState('lt75')
  const [answers, setAnswers] = useState({})
  const heartRatePoints =
    heartRateOptions.find((option) => option.id === heartRate)?.points ?? 0
  const total = useMemo(() => sumScore(answers) + heartRatePoints, [answers, heartRatePoints])
  const { interpretation, conduct, tone } = getSimplifiedGenevaAssessment(total)
  const valueMeaning =
    total >= 3
      ? 'Una puntuación de 3 o más hace probable el TEP con la versión dicotómica simplificada.'
      : 'Una puntuación de 0 a 2 hace menos probable el TEP, pero no lo excluye sin completar el algoritmo.'

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
      title='Ginebra simplificada'
      description='Regla objetiva de probabilidad pretest de TEP sin el componente subjetivo de Wells.'
      clinicalUse='Ofrece una alternativa estructurada para decidir dímero-D o imagen en sospecha de TEP.'
      whenToUse='Sospecha de TEP cuando prefieres una escala totalmente objetiva basada en datos clínicos.'
      whatIs='Versión simplificada de la escala de Ginebra para probabilidad clínica de TEP.'
      whatFor='Ayuda a estratificar sospecha de TEP sin recurrir al juicio de “TEP más probable”.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación Ginebra'
      scoreValue={formatNumericScore(total)}
      interpretation={interpretation}
      conduct={conduct}
      note='En esta versión, casi todos los ítems suman 1 punto; la frecuencia cardiaca ≥ 95 lpm suma 2.'
      tone={tone}
    >
      <div className='question-grid'>
        <section className='question-card'>
          <div className='question-card-head'>
            <span className='question-index'>01</span>
            <h4>Frecuencia cardiaca</h4>
          </div>

          <div className='option-stack option-stack--inline'>
            {heartRateOptions.map((option) => (
              <label
                key={option.id}
                className={heartRate === option.id ? 'choice-card choice-card--selected' : 'choice-card'}
              >
                <input
                  type='radio'
                  name='geneva-heart-rate'
                  checked={heartRate === option.id}
                  onChange={() => setHeartRate(option.id)}
                />
                <span>{option.label}</span>
                <strong>{option.points > 0 ? `+${option.points}` : option.points}</strong>
              </label>
            ))}
          </div>
        </section>
      </div>

      <BinaryCriteriaGrid
        answers={answers}
        criteria={factors}
        onToggle={handleToggle}
        startIndex={2}
      />
    </ToolPage>
  )
}
