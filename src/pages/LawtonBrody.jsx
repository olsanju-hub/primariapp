import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getLawtonAssessment, sumScore } from '../scoreUtils'

const items = [
  {
    key: 'telephone',
    label: 'Uso del teléfono',
    options: [
      { label: 'Llama y responde sin ayuda', value: 1, meta: '+1' },
      { label: 'Precisa ayuda o no lo usa de forma autónoma', value: 0, meta: '0' },
    ],
  },
  {
    key: 'shopping',
    label: 'Compras',
    options: [
      { label: 'Hace todas las compras necesarias', value: 1, meta: '+1' },
      { label: 'Necesita ayuda o depende para comprar', value: 0, meta: '0' },
    ],
  },
  {
    key: 'food',
    label: 'Preparación de comidas',
    options: [
      { label: 'Prepara comidas adecuadas sin ayuda', value: 1, meta: '+1' },
      { label: 'Precisa ayuda o no prepara comidas', value: 0, meta: '0' },
    ],
  },
  {
    key: 'housekeeping',
    label: 'Tareas domésticas',
    options: [
      { label: 'Mantiene la casa con autonomía razonable', value: 1, meta: '+1' },
      { label: 'Necesita ayuda relevante o no puede hacerlo', value: 0, meta: '0' },
    ],
  },
  {
    key: 'laundry',
    label: 'Lavado de ropa',
    options: [
      { label: 'Se ocupa por sí mismo de toda la ropa', value: 1, meta: '+1' },
      { label: 'Necesita ayuda o depende para esta tarea', value: 0, meta: '0' },
    ],
  },
  {
    key: 'transport',
    label: 'Transporte',
    options: [
      { label: 'Se desplaza solo en transporte o conduce', value: 1, meta: '+1' },
      { label: 'Necesita acompañamiento o depende de otros', value: 0, meta: '0' },
    ],
  },
  {
    key: 'medication',
    label: 'Manejo de medicación',
    options: [
      { label: 'Toma la medicación correcta sin ayuda', value: 1, meta: '+1' },
      { label: 'Precisa supervisión o preparación externa', value: 0, meta: '0' },
    ],
  },
  {
    key: 'finances',
    label: 'Manejo económico',
    options: [
      { label: 'Gestiona pagos y dinero con autonomía', value: 1, meta: '+1' },
      { label: 'Necesita ayuda o no puede manejar finanzas', value: 0, meta: '0' },
    ],
  },
]

export default function LawtonBrody() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getLawtonAssessment(total, complete)
  const missingActivities = complete ? 8 - total : null
  const valueMeaning = complete
    ? missingActivities === 0
      ? 'Un 8/8 indica autonomía instrumental conservada.'
      : `${total}/8 refleja autonomía en ${total} actividades instrumentales y dependencia en ${missingActivities}.`
    : 'Cuantos más puntos obtiene, más actividades instrumentales conserva de forma autónoma.'

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
      title='Lawton-Brody'
      description='Escala de actividades instrumentales de la vida diaria para estimar autonomía funcional más compleja.'
      clinicalUse='Ayuda a detectar dependencia instrumental y necesidades de apoyo en domicilio o seguimiento geriátrico.'
      whenToUse='Valoración basal, sospecha de pérdida funcional y planificación de cuidados o recursos.'
      whatIs='Escala de autonomía en actividades instrumentales de la vida diaria.'
      whatFor='Sirve para estimar cuánto apoyo necesita la persona fuera de las ABVD.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación total'
      scoreValue={`${total} / 8`}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa la versión completa de 8 ítems para ambos sexos. Si alguna actividad no formó parte del patrón habitual previo, interpreta el resultado con contexto clínico y social.'
      tone={tone}
    >
      <ScoredChoiceGrid items={items} answers={answers} onSelect={handleSelect} compact />
    </ToolPage>
  )
}
