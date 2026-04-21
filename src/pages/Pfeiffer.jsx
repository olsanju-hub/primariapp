import React, { useMemo, useState } from 'react'
import { ChoiceField } from '../components/CardioFieldCards'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getPfeifferAssessment, sumScore } from '../scoreUtils'

const educationOptions = [
  { value: 'low', label: 'Primaria o menos', meta: '+1 error permitido' },
  { value: 'standard', label: 'Secundaria / bachillerato', meta: 'Sin ajuste' },
  { value: 'high', label: 'Más que bachillerato', meta: '-1 error permitido' },
]

const items = [
  {
    key: 'date',
    label: 'Fecha completa',
    helper: 'Día, mes y año actuales.',
    options: [
      { label: 'Correcta', value: 0, meta: 'Ok' },
      { label: 'Incorrecta', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'weekday',
    label: 'Día de la semana',
    options: [
      { label: 'Correcto', value: 0, meta: 'Ok' },
      { label: 'Incorrecto', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'place',
    label: 'Nombre del lugar',
    options: [
      { label: 'Correcto', value: 0, meta: 'Ok' },
      { label: 'Incorrecto', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'phone',
    label: 'Teléfono o dirección si no tiene teléfono',
    options: [
      { label: 'Correcto', value: 0, meta: 'Ok' },
      { label: 'Incorrecto', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'age',
    label: 'Edad',
    options: [
      { label: 'Correcta', value: 0, meta: 'Ok' },
      { label: 'Incorrecta', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'birthdate',
    label: 'Fecha de nacimiento',
    options: [
      { label: 'Correcta', value: 0, meta: 'Ok' },
      { label: 'Incorrecta', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'president',
    label: 'Presidente/a actual del Gobierno',
    options: [
      { label: 'Correcto', value: 0, meta: 'Ok' },
      { label: 'Incorrecto', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'previousPresident',
    label: 'Presidente/a anterior del Gobierno',
    options: [
      { label: 'Correcto', value: 0, meta: 'Ok' },
      { label: 'Incorrecto', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'motherSurname',
    label: 'Apellido de soltera de la madre',
    options: [
      { label: 'Correcto', value: 0, meta: 'Ok' },
      { label: 'Incorrecto', value: 1, meta: '+1' },
    ],
  },
  {
    key: 'serialSubtraction',
    label: 'Restar de 3 en 3 desde 20',
    helper: 'Solo puntúa como correcta si completa bien toda la serie.',
    options: [
      { label: 'Correcta', value: 0, meta: 'Ok' },
      { label: 'Incorrecta', value: 1, meta: '+1' },
    ],
  },
]

const educationModifiers = {
  low: -1,
  standard: 0,
  high: 1,
}

export default function Pfeiffer() {
  const [education, setEducation] = useState('standard')
  const [answers, setAnswers] = useState({})

  const rawErrors = useMemo(() => sumScore(answers), [answers])
  const complete = items.every((item) => Object.hasOwn(answers, item.key))
  const adjustedErrors = Math.max(0, Math.min(10, rawErrors + educationModifiers[education]))
  const { interpretation, conduct, tone } = getPfeifferAssessment(adjustedErrors, complete)
  const adjustmentLabel =
    education === 'low'
      ? 'Se admite un error extra'
      : education === 'high'
        ? 'Se admite un error menos'
        : 'Sin ajuste educativo'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Geriatría'
      subsection='Cognición'
      status='Operativa'
      title='Pfeiffer'
      description='SPMSQ breve para cribado cognitivo rápido mediante recuento de errores.'
      clinicalUse='Ayuda a detectar deterioro cognitivo de forma ágil en consulta, planta o urgencias.'
      whenToUse='Sospecha de deterioro cognitivo, valoración basal y reevaluación funcional geriátrica.'
      whatIs='Cuestionario breve de cribado cognitivo por número de errores.'
      whatFor='Sirve para orientar si hay deterioro cognitivo y su magnitud aproximada.'
      valueMeaning={`La lectura se basa en errores ajustados por escolaridad. ${adjustmentLabel}.`}
      scoreLabel='Errores ajustados'
      scoreValue={`${adjustedErrors} / 10`}
      interpretation={interpretation}
      conduct={conduct}
      note={`Errores brutos: ${rawErrors}. El ajuste educativo sigue la pauta clásica del SPMSQ: +1 error permitido en escolaridad básica o menor y -1 en estudios superiores. Las preguntas políticas se interpretan con adaptación al contexto nacional actual.`}
      tone={tone}
    >
      <div className='question-grid'>
        <ChoiceField
          index={1}
          label='Escolaridad'
          helper='Ajusta la tolerancia de errores según nivel educativo.'
          options={educationOptions}
          value={education}
          onChange={setEducation}
          name='pfeiffer-education'
          wide
        />
      </div>

      <ScoredChoiceGrid
        items={items}
        answers={answers}
        onSelect={handleSelect}
        startIndex={2}
        compact
      />
    </ToolPage>
  )
}
