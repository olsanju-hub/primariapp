import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import { getPercAssessment, sumScore } from '../scoreUtils'
import ToolPage from '../ToolPage'

const factors = [
  { key: 'age', label: 'Edad ≥ 50 años', value: 1 },
  { key: 'heartRate', label: 'Frecuencia cardiaca ≥ 100 lpm', value: 1 },
  { key: 'oxygen', label: 'SatO₂ < 95 %', value: 1 },
  { key: 'hemoptysis', label: 'Hemoptisis', value: 1 },
  { key: 'estrogen', label: 'Uso de estrógenos', value: 1 },
  {
    key: 'recentSurgery',
    label: 'Cirugía o traumatismo con hospitalización en las últimas 4 semanas',
    value: 1,
  },
  { key: 'previousVte', label: 'TEV previa', value: 1 },
  { key: 'legSwelling', label: 'Tumefacción unilateral de pierna', value: 1 },
]

export default function PERC() {
  const [lowPretestProbability, setLowPretestProbability] = useState(true)
  const [answers, setAnswers] = useState({})

  const total = useMemo(() => sumScore(answers), [answers])
  const { interpretation, conduct, tone } = getPercAssessment(total, lowPretestProbability)
  const valueMeaning = !lowPretestProbability
    ? 'Sin probabilidad clínica basal baja, PERC no sirve para excluir TEP aunque no marques criterios.'
    : total === 0
      ? 'Con sospecha basal baja y 0 criterios positivos, PERC permite descartar TEP sin ampliar estudio.'
      : 'Cualquier criterio positivo invalida la regla y obliga a continuar el algoritmo diagnóstico.'

  const handleToggle = (criterion, checked) => {
    setAnswers((current) => ({
      ...current,
      [criterion.key]: checked ? criterion.value : 0,
    }))
  }

  return (
    <ToolPage
      specialty='Urgencias'
      status='Operativa'
      title='PERC'
      description='Regla de exclusión clínica de TEP solo para pacientes con probabilidad previa baja.'
      clinicalUse='Ayuda a evitar pruebas innecesarias cuando la sospecha clínica basal es baja.'
      whenToUse='Sospecha de TEP con baja probabilidad clínica antes de pedir dímero-D o imagen.'
      whatIs='Regla de exclusión clínica para tromboembolismo pulmonar en pacientes de muy bajo riesgo.'
      whatFor='Permite evitar dímero-D o imagen cuando la sospecha clínica basal ya es baja.'
      valueMeaning={valueMeaning}
      scoreLabel='Criterios positivos'
      scoreValue={`${total} / 8`}
      interpretation={interpretation}
      conduct={conduct}
      note='PERC no se aplica si la probabilidad clínica inicial no es baja. Una sola respuesta positiva invalida la regla.'
      tone={tone}
    >
      <div className='question-grid'>
        <section className='question-card'>
          <div className='question-card-head'>
            <span className='question-index'>01</span>
            <h4>Probabilidad clínica basal</h4>
          </div>

          <div className='option-stack option-stack--inline'>
            <label
              className={
                lowPretestProbability ? 'choice-card choice-card--selected' : 'choice-card'
              }
            >
              <input
                type='radio'
                name='perc-pretest'
                checked={lowPretestProbability}
                onChange={() => setLowPretestProbability(true)}
              />
              <span>Baja</span>
              <strong>Aplicable</strong>
            </label>

            <label
              className={
                !lowPretestProbability ? 'choice-card choice-card--selected' : 'choice-card'
              }
            >
              <input
                type='radio'
                name='perc-pretest'
                checked={!lowPretestProbability}
                onChange={() => setLowPretestProbability(false)}
              />
              <span>No baja / incierta</span>
              <strong>No aplicar</strong>
            </label>
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
