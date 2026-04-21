import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import { getYearsAssessment, sumScore } from '../scoreUtils'
import ToolPage from '../ToolPage'

const factors = [
  { key: 'clinicalDvt', label: 'Signos clínicos de TVP', value: 1 },
  { key: 'hemoptysis', label: 'Hemoptisis', value: 1 },
  { key: 'peMostLikely', label: 'El TEP es el diagnóstico más probable', value: 1 },
]

export default function YEARS() {
  const [answers, setAnswers] = useState({})
  const [dDimerInput, setDDimerInput] = useState('')

  const criteriaCount = useMemo(() => sumScore(answers), [answers])
  const dDimer = useMemo(() => {
    const parsed = Number.parseFloat(dDimerInput)

    if (!Number.isFinite(parsed) || parsed < 0) {
      return null
    }

    return parsed
  }, [dDimerInput])

  const threshold = criteriaCount === 0 ? 1000 : 500
  const { interpretation, conduct, tone } = getYearsAssessment(criteriaCount, dDimer)
  const valueMeaning =
    dDimer == null
      ? 'El número de ítems YEARS no basta: necesitas introducir el dímero-D para cerrar el algoritmo.'
      : dDimer < threshold
        ? `Con ${criteriaCount} ítems, el corte aplicable es ${threshold} ng/mL; por debajo de ese valor el algoritmo descarta TEP.`
        : `Con ${criteriaCount} ítems, superar el corte de ${threshold} ng/mL obliga a continuar con imagen.`

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
      title='YEARS'
      description='Algoritmo simplificado para sospecha de TEP que combina 3 criterios clínicos y dímero-D.'
      clinicalUse='Reduce imagen innecesaria cuando el dímero-D queda por debajo del corte adaptado a los ítems YEARS.'
      whenToUse='Sospecha de TEP en paciente hemodinámicamente estable con dímero-D disponible.'
      whatIs='Algoritmo de probabilidad clínica adaptada con tres ítems y un corte variable de dímero-D.'
      whatFor='Sirve para decidir si puede descartarse TEP sin imagen o si hay que continuar el estudio.'
      valueMeaning={valueMeaning}
      scoreLabel='Ítems YEARS'
      scoreValue={`${criteriaCount} / 3`}
      interpretation={interpretation}
      conduct={conduct}
      note='YEARS clásico: con 0 ítems usa un corte de dímero-D < 1000 ng/mL; con 1 o más ítems usa < 500 ng/mL.'
      tone={tone}
    >
      <div className='question-grid'>
        <section className='question-card question-card--wide'>
          <div className='question-card-head'>
            <span className='question-index'>01</span>
            <div>
              <h4>Dímero-D</h4>
              <p className='question-helper'>Introduce el valor en ng/mL FEU (equivalente a µg/L).</p>
            </div>
          </div>

          <label className='metric-input'>
            <input
              type='number'
              min='0'
              step='1'
              inputMode='numeric'
              value={dDimerInput}
              onChange={(event) => setDDimerInput(event.target.value)}
              placeholder='Ejemplo: 420'
            />
            <span>ng/mL</span>
          </label>

          <div className='metric-inline-note'>
            Corte actual del algoritmo: <strong>{threshold} ng/mL</strong>
          </div>
        </section>
      </div>

      <BinaryCriteriaGrid
        answers={answers}
        criteria={factors}
        onToggle={handleToggle}
        startIndex={2}
        compact
      />
    </ToolPage>
  )
}
