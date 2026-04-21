import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getBarthelAssessment, sumScore } from '../scoreUtils'

const items = [
  {
    key: 'feeding',
    label: 'Alimentación',
    options: [
      { label: 'Independiente', value: 10, meta: '+10' },
      { label: 'Necesita ayuda', value: 5, meta: '+5' },
      { label: 'Dependiente', value: 0, meta: '0' },
    ],
  },
  {
    key: 'bathing',
    label: 'Baño',
    options: [
      { label: 'Independiente', value: 5, meta: '+5' },
      { label: 'Dependiente', value: 0, meta: '0' },
    ],
  },
  {
    key: 'grooming',
    label: 'Aseo personal',
    options: [
      { label: 'Independiente', value: 5, meta: '+5' },
      { label: 'Dependiente', value: 0, meta: '0' },
    ],
  },
  {
    key: 'dressing',
    label: 'Vestido',
    options: [
      { label: 'Independiente', value: 10, meta: '+10' },
      { label: 'Necesita ayuda', value: 5, meta: '+5' },
      { label: 'Dependiente', value: 0, meta: '0' },
    ],
  },
  {
    key: 'bowels',
    label: 'Deposición',
    options: [
      { label: 'Continente', value: 10, meta: '+10' },
      { label: 'Accidente ocasional', value: 5, meta: '+5' },
      { label: 'Incontinente', value: 0, meta: '0' },
    ],
  },
  {
    key: 'bladder',
    label: 'Micción',
    options: [
      { label: 'Continente', value: 10, meta: '+10' },
      { label: 'Accidente ocasional', value: 5, meta: '+5' },
      { label: 'Incontinente', value: 0, meta: '0' },
    ],
  },
  {
    key: 'toilet',
    label: 'Uso del retrete',
    options: [
      { label: 'Independiente', value: 10, meta: '+10' },
      { label: 'Necesita ayuda', value: 5, meta: '+5' },
      { label: 'Dependiente', value: 0, meta: '0' },
    ],
  },
  {
    key: 'transfers',
    label: 'Transferencias cama-silla',
    options: [
      { label: 'Independiente', value: 15, meta: '+15' },
      { label: 'Ayuda pequeña', value: 10, meta: '+10' },
      { label: 'Ayuda importante', value: 5, meta: '+5' },
      { label: 'Dependiente', value: 0, meta: '0' },
    ],
  },
  {
    key: 'mobility',
    label: 'Deambulación',
    options: [
      { label: 'Independiente', value: 15, meta: '+15' },
      { label: 'Ayuda de una persona', value: 10, meta: '+10' },
      { label: 'Silla de ruedas autónoma', value: 5, meta: '+5' },
      { label: 'Incapaz', value: 0, meta: '0' },
    ],
  },
  {
    key: 'stairs',
    label: 'Escaleras',
    options: [
      { label: 'Independiente', value: 10, meta: '+10' },
      { label: 'Necesita ayuda', value: 5, meta: '+5' },
      { label: 'Incapaz', value: 0, meta: '0' },
    ],
  },
]

export default function Barthel() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getBarthelAssessment(total, complete)

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Geriatría'
      subsection='Funcionalidad'
      status='Operativa'
      title='Índice de Barthel'
      description='Escala funcional de ABVD para estimar de forma rápida el grado de dependencia básica.'
      clinicalUse='Ayuda a valorar autonomía funcional, planificación de cuidados y necesidades de apoyo.'
      whenToUse='Consulta, planta, urgencias, domicilio, alta hospitalaria y seguimiento geriátrico.'
      whatIs='Escala de actividades básicas de la vida diaria.'
      whatFor='Sirve para estimar dependencia básica y orientar recursos asistenciales.'
      valueMeaning='Puntuaciones más altas indican mayor independencia en ABVD; 100 corresponde a independencia funcional completa en la escala.'
      scoreLabel='Puntuación total'
      scoreValue={`${total} / 100`}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa la versión clásica de 10 ítems y 100 puntos. Reevalúa si cambian movilidad, continencia, entorno o soporte cuidador.'
      tone={tone}
    >
      <ScoredChoiceGrid items={items} answers={answers} onSelect={handleSelect} />
    </ToolPage>
  )
}
