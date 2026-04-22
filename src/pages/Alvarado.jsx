import React, { useMemo, useState } from 'react'
import BinaryCriteriaGrid from '../components/BinaryCriteriaGrid'
import ToolPage from '../ToolPage'
import { getAlvaradoAssessment, sumScore } from '../scoreUtils'

const criteria = [
  { key: 'migration', label: 'Migración del dolor a fosa ilíaca derecha', value: 1 },
  { key: 'anorexia', label: 'Anorexia', value: 1 },
  { key: 'nausea', label: 'Náuseas o vómitos', value: 1 },
  { key: 'tenderness', label: 'Dolor a la palpación en fosa ilíaca derecha', value: 2 },
  { key: 'rebound', label: 'Irritación peritoneal o dolor a la descompresión', value: 1 },
  { key: 'fever', label: 'Temperatura igual o mayor de 37,3 °C', value: 1 },
  { key: 'leukocytosis', label: 'Leucocitosis', value: 2 },
  { key: 'leftShift', label: 'Neutrofilia o desviación a la izquierda', value: 1 },
]

export default function Alvarado() {
  const [answers, setAnswers] = useState({})
  const total = useMemo(() => sumScore(answers), [answers])
  const { interpretation, conduct, tone } = getAlvaradoAssessment(total)

  const valueMeaning =
    total <= 4
      ? 'Valores bajos hacen menos probable la apendicitis, aunque no excluyen reevaluación si la clínica evoluciona.'
      : total <= 6
        ? 'Los valores intermedios suelen requerir observación, repetición de exploración y apoyo con imagen.'
        : 'Las puntuaciones altas aumentan la probabilidad clínica de apendicitis y suelen acelerar valoración quirúrgica.'

  const handleToggle = (criterion, checked) => {
    setAnswers((current) => ({
      ...current,
      [criterion.key]: checked ? criterion.value : 0,
    }))
  }

  return (
    <ToolPage
      specialty='Digestivo'
      subsection='Abdomen agudo'
      status='Operativa'
      title='Alvarado'
      description='Escala clínica MANTRELS para estimar de forma rápida la probabilidad de apendicitis aguda.'
      clinicalUse='Ayuda a ordenar la sospecha clínica inicial y a decidir observación, imagen o valoración quirúrgica.'
      whenToUse='Dolor abdominal compatible con apendicitis antes de confirmar el diagnóstico por imagen o cirugía.'
      whatIs='Escala clínica de probabilidad para apendicitis aguda.'
      whatFor='Sirve para orientar la sospecha inicial en abdomen agudo y priorizar el siguiente paso diagnóstico.'
      valueMeaning={valueMeaning}
      scoreLabel='Puntuación Alvarado'
      scoreValue={`${total} / 10`}
      interpretation={interpretation}
      conduct={conduct}
      note='Se usa la versión clásica de 10 puntos. No sustituye reevaluación seriada, ecografía o TC si el cuadro sigue siendo dudoso.'
      tone={tone}
    >
      <BinaryCriteriaGrid
        answers={answers}
        criteria={criteria}
        onToggle={handleToggle}
      />
    </ToolPage>
  )
}
