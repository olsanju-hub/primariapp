import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import { ChoiceField } from '../components/CardioFieldCards'
import { getCha2ds2VascAssessment, sumScore } from '../scoreUtils'
import ToolPage from '../ToolPage'

const ageBands = [
  { label: 'Menor de 65 años', value: 0, meta: '0' },
  { label: 'Entre 65 y 74 años', value: 1, meta: '+1' },
  { label: '75 años o más', value: 2, meta: '+2' },
]

const factors = [
  { key: 'heartFailure', label: 'Insuficiencia cardiaca o disfunción ventricular izquierda', value: 1 },
  { key: 'hypertension', label: 'Hipertensión arterial', value: 1 },
  { key: 'diabetes', label: 'Diabetes mellitus', value: 1 },
  { key: 'stroke', label: 'Ictus, AIT o tromboembolismo arterial previo', value: 2 },
  { key: 'vascularDisease', label: 'Enfermedad vascular (IAM, EAP o placa aórtica)', value: 1 },
  { key: 'sexCategory', label: 'Sexo femenino', value: 1 },
]

export default function CHA2DS2VASc() {
  const [answers, setAnswers] = useState({})
  const [ageScore, setAgeScore] = useState(0)
  const total = useMemo(() => sumScore(answers) + ageScore, [answers, ageScore])
  const femaleSexSelected = Boolean(answers.sexCategory)
  const { interpretation, conduct, tone } = getCha2ds2VascAssessment(total, femaleSexSelected)
  const valueMeaning =
    total === 0 || (femaleSexSelected && total === 1)
      ? 'Valores bajos indican poca carga tromboembólica por escala; el punto aislado por sexo femenino no equivale a un factor no sexual añadido.'
      : (!femaleSexSelected && total === 1) || (femaleSexSelected && total === 2)
        ? 'Un único factor no sexual ya obliga a valorar anticoagulación según contexto y preferencias.'
        : 'Puntuaciones más altas expresan mayor riesgo embólico y suelen apoyar anticoagulación si no hay contraindicaciones.'

  const handleToggle = (criterion, checked) => {
    setAnswers((current) => ({
      ...current,
      [criterion.key]: checked ? criterion.value : 0,
    }))
  }

  return (
    <ToolPage
      specialty='Cardiología'
      status='Operativa'
      title='CHA₂DS₂-VASc'
      description='Escala para estimar riesgo tromboembólico en fibrilación auricular no valvular.'
      clinicalUse='Apoya la indicación de anticoagulación junto al juicio clínico y preferencias del paciente.'
      whenToUse='Consulta de FA, revisión de tratamiento y reevaluación del balance riesgo-beneficio.'
      whatIs='Escala de riesgo embólico para fibrilación auricular no valvular.'
      whatFor='Ayuda a decidir cuándo plantear anticoagulación oral.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación total'
      scoreValue={`${total}`}
      interpretation={interpretation}
      conduct={conduct}
      note='Se mantiene la versión clásica CHA₂DS₂-VASc. El sexo femenino aislado no debe interpretarse como un factor tromboembólico equivalente a los no sexuales.'
      tone={tone}
    >
      <div className='question-grid'>
        <ChoiceField
          index={1}
          label='Edad'
          helper='Selecciona un único tramo para evitar doble contabilización.'
          options={ageBands}
          value={ageScore}
          onChange={setAgeScore}
          name='cha2-age'
        />
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
