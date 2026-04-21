import React, { useMemo, useState } from 'react'
import ScoredChoiceGrid from '../components/ScoredChoiceGrid'
import ToolPage from '../ToolPage'
import { getMMRCAssessment } from '../scoreUtils'

const items = [
  {
    key: 'grade',
    label: 'Selecciona el grado mMRC',
    helper: 'Marca el escenario que mejor refleja la limitación habitual por disnea.',
    wide: true,
    options: [
      { label: 'Solo me falta el aire con ejercicio intenso', value: 0, meta: 'Grado 0' },
      {
        label: 'Me falta el aire al apurar el paso en llano o al subir una cuesta suave',
        value: 1,
        meta: 'Grado 1',
      },
      {
        label: 'Camino más despacio que personas de mi edad o tengo que parar en llano a mi ritmo',
        value: 2,
        meta: 'Grado 2',
      },
      {
        label: 'Tengo que parar a respirar tras unos 100 metros o pocos minutos en llano',
        value: 3,
        meta: 'Grado 3',
      },
      {
        label: 'No salgo de casa o me falta el aire al vestirme o desvestirme',
        value: 4,
        meta: 'Grado 4',
      },
    ],
  },
]

export default function MMRC() {
  const [answers, setAnswers] = useState({})
  const grade = useMemo(() => answers.grade ?? null, [answers])
  const complete = grade !== null
  const { interpretation, conduct, tone } = getMMRCAssessment(grade, complete)
  const valueMeaning = complete
    ? grade <= 1
      ? 'Los grados 0-1 reflejan menor limitación por disnea.'
      : 'Los grados 2-4 indican disnea clínicamente relevante y mayor limitación funcional.'
    : 'El grado aumenta de 0 a 4 según la limitación funcional causada por la disnea.'

  const handleSelect = (key, value) => {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }))
  }

  return (
    <ToolPage
      specialty='Neumología'
      subsection='Disnea y síntomas'
      status='Operativa'
      title='mMRC'
      description='Escala clínica ultrarrápida para graduar la disnea según limitación funcional habitual.'
      clinicalUse='Ayuda a cuantificar carga disneica y a complementar la valoración sintomática respiratoria.'
      whenToUse='Consulta respiratoria, EPOC, seguimiento funcional y valoración basal de disnea.'
      whatIs='Escala breve de disnea basada en limitación al esfuerzo.'
      whatFor='Sirve para graduar la intensidad funcional de la disnea.'
      valueMeaning={valueMeaning}
      scoreLabel='Grado mMRC'
      scoreValue={complete ? `${grade}` : 'Pendiente'}
      interpretation={interpretation}
      conduct={conduct}
      note='Es una escala funcional sencilla y no sustituye saturación, frecuencia respiratoria ni valoración etiológica de la disnea.'
      tone={tone}
    >
      <ScoredChoiceGrid items={items} answers={answers} onSelect={handleSelect} />
    </ToolPage>
  )
}
