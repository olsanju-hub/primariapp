import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getCageAssessment, sumScore } from '../scoreUtils'

const yesNoOptions = [
  { label: 'No', value: 0, meta: '0' },
  { label: 'Sí', value: 1, meta: '+1' },
]

const items = [
  {
    key: 'cutDown',
    label: '¿Ha sentido que debería reducir su consumo de alcohol?',
    options: yesNoOptions,
  },
  {
    key: 'annoyed',
    label: '¿Le ha molestado que otras personas critiquen su forma de beber?',
    options: yesNoOptions,
  },
  {
    key: 'guilty',
    label: '¿Se ha sentido culpable por su manera de beber?',
    options: yesNoOptions,
  },
  {
    key: 'eyeOpener',
    label: '¿Ha tomado alguna vez una copa por la mañana para sentirse mejor o aliviar la resaca?',
    options: yesNoOptions,
  },
]

export default function CAGE() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const { interpretation, conduct, tone } = getCageAssessment(total, complete)

  const valueMeaning = !complete
    ? 'La suma va de 0 a 4 y orienta si el cribado de consumo problemático es significativo.'
    : total >= 2
      ? 'Dos o más respuestas positivas suelen considerarse clínicamente significativas.'
      : 'Con menos de 2 respuestas positivas el cribado no alcanza el umbral clásico, aunque el contexto clínico sigue importando.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Salud Mental'
      subsection='Alcohol'
      status='Operativa'
      title='CAGE'
      description='Cuestionario clásico de 4 preguntas para sospecha de consumo problemático de alcohol.'
      clinicalUse='Permite identificar de forma muy rápida señales de alarma relacionadas con el alcohol.'
      whenToUse='Cribado clínico breve cuando existe sospecha o como complemento de AUDIT-C.'
      whatIs='Cuestionario breve de 4 preguntas sobre problemas relacionados con el alcohol.'
      whatFor='Sirve para detectar señales de alerta que justifican ampliar la entrevista sobre consumo.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación CAGE'
      scoreValue={`${total} / 4`}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa el punto de corte clásico de 2 respuestas positivas como cribado clínicamente significativo.'
      tone={tone}
    >
      <ScoredChoiceGrid
        items={items}
        answers={answers}
        onSelect={handleSelect}
        compact
      />
    </ToolPage>
  )
}
