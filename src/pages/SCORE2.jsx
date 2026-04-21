import React, { useMemo, useState } from 'react'
import { ChoiceField, NumberField } from '../components/CardioFieldCards'
import {
  calculateScore2Risk,
  formatNumericScore,
  getScore2Assessment,
} from '../scoreUtils'
import ToolPage from '../ToolPage'

const scopeOptions = [
  { value: 'eligible', label: 'Población válida para SCORE2', meta: 'Apta' },
  { value: 'outside', label: 'ASCVD, diabetes, ERC o trastorno lipídico/BP raro', meta: 'Excluir' },
]

const sexOptions = [
  { value: 'male', label: 'Hombre', meta: 'Varón' },
  { value: 'female', label: 'Mujer', meta: 'Mujer' },
]

const smokingOptions = [
  { value: 'no', label: 'No fumador actual', meta: 'No' },
  { value: 'yes', label: 'Fumador actual', meta: 'Sí' },
]

const regionOptions = [
  { value: 'low', label: 'Bajo riesgo', meta: 'España' },
  { value: 'moderate', label: 'Riesgo moderado', meta: 'ESC' },
  { value: 'high', label: 'Riesgo alto', meta: 'ESC' },
  { value: 'veryHigh', label: 'Riesgo muy alto', meta: 'ESC' },
]

function mgDlToMmol(value) {
  return value / 38.67
}

export default function SCORE2() {
  const [scope, setScope] = useState('eligible')
  const [sex, setSex] = useState('male')
  const [smoking, setSmoking] = useState('no')
  const [region, setRegion] = useState('low')
  const [ageInput, setAgeInput] = useState('55')
  const [sbpInput, setSbpInput] = useState('130')
  const [totalCholInput, setTotalCholInput] = useState('200')
  const [hdlInput, setHdlInput] = useState('50')

  const age = Number.parseFloat(ageInput)
  const systolicBp = Number.parseFloat(sbpInput)
  const totalCholMg = Number.parseFloat(totalCholInput)
  const hdlMg = Number.parseFloat(hdlInput)
  const totalCholMmol = Number.isFinite(totalCholMg) ? mgDlToMmol(totalCholMg) : NaN
  const hdlMmol = Number.isFinite(hdlMg) ? mgDlToMmol(hdlMg) : NaN
  const nonHdlMg = Number.isFinite(totalCholMg) && Number.isFinite(hdlMg) ? totalCholMg - hdlMg : NaN

  const outsideValidatedPopulation = scope === 'outside'
  const ageInRange = Number.isFinite(age) && age >= 40 && age <= 69

  const riskPercent = useMemo(() => {
    if (outsideValidatedPopulation || !ageInRange) {
      return null
    }

    return calculateScore2Risk({
      sex,
      age,
      smoker: smoking === 'yes',
      systolicBp,
      totalCholesterol: totalCholMmol,
      hdlCholesterol: hdlMmol,
      region,
    })
  }, [age, ageInRange, outsideValidatedPopulation, sex, smoking, systolicBp, totalCholMmol, hdlMmol, region])

  const { interpretation, conduct, tone, category } = getScore2Assessment(
    age,
    riskPercent,
    outsideValidatedPopulation
  )

  const valueMeaning = outsideValidatedPopulation
    ? 'Expresa riesgo cardiovascular a 10 años solo en prevención primaria; si el paciente está fuera del ámbito, no debe interpretarse.'
    : Number.isFinite(riskPercent)
      ? `${formatNumericScore(riskPercent)}% a 10 años corresponde a riesgo ${category.toLowerCase()} para este tramo de edad.`
      : 'Expresa el riesgo de primer evento aterosclerótico fatal o no fatal a 10 años en personas de 40 a 69 años.'

  const scoreValue = outsideValidatedPopulation
    ? 'Fuera de ámbito'
    : ageInRange && Number.isFinite(riskPercent)
      ? `${formatNumericScore(riskPercent)} %`
      : 'Pendiente'

  const dynamicNote = !ageInRange && scope !== 'outside'
    ? 'SCORE2 está validado entre 40 y 69 años. Para 70 años o más usa SCORE2-OP.'
    : 'La fórmula oficial usa colesterol total y HDL en mmol/L; aquí puedes introducirlos en mg/dL y se convierten internamente. España pertenece a la región de bajo riesgo.'

  return (
    <ToolPage
      specialty='Cardiología'
      subsection='Riesgo cardiovascular'
      status='Operativa'
      title='SCORE2'
      description='Estimación de riesgo cardiovascular a 10 años para prevención primaria en adultos de 40 a 69 años.'
      clinicalUse='Ayuda a situar el nivel de riesgo aterosclerótico y orientar la intensidad de la prevención.'
      whenToUse='Personas aparentemente sanas sin ASCVD, diabetes, ERC moderada-grave ni trastornos lipídicos o tensionales raros.'
      whatIs='Algoritmo europeo de riesgo cardiovascular fatal y no fatal a 10 años.'
      whatFor='Sirve para graduar la prevención en personas sin enfermedad cardiovascular conocida.'
      valueMeaning={valueMeaning}
      scoreLabel='Riesgo SCORE2'
      scoreValue={scoreValue}
      interpretation={interpretation}
      conduct={conduct}
      note={dynamicNote}
      tone={tone}
    >
      <div className='question-grid'>
        <ChoiceField
          index={1}
          label='Ámbito de uso'
          helper='Marca si el paciente está dentro o fuera de la población validada.'
          options={scopeOptions}
          value={scope}
          onChange={setScope}
          name='score2-scope'
          wide
        />

        <NumberField
          index={2}
          label='Edad'
          helper='SCORE2 se usa de 40 a 69 años.'
          value={ageInput}
          onChange={setAgeInput}
          placeholder='55'
          unit='años'
        />

        <ChoiceField
          index={3}
          label='Sexo'
          options={sexOptions}
          value={sex}
          onChange={setSex}
          name='score2-sex'
        />

        <ChoiceField
          index={4}
          label='Región SCORE2'
          helper='España pertenece a la región de bajo riesgo.'
          options={regionOptions}
          value={region}
          onChange={setRegion}
          name='score2-region'
          wide
        />

        <ChoiceField
          index={5}
          label='Tabaquismo'
          options={smokingOptions}
          value={smoking}
          onChange={setSmoking}
          name='score2-smoking'
        />

        <NumberField
          index={6}
          label='Presión arterial sistólica'
          value={sbpInput}
          onChange={setSbpInput}
          placeholder='130'
          unit='mmHg'
        />

        <NumberField
          index={7}
          label='Colesterol total'
          helper='Introduce el valor en mg/dL.'
          value={totalCholInput}
          onChange={setTotalCholInput}
          placeholder='200'
          unit='mg/dL'
        />

        <NumberField
          index={8}
          label='HDL-colesterol'
          helper='Introduce el valor en mg/dL.'
          value={hdlInput}
          onChange={setHdlInput}
          placeholder='50'
          unit='mg/dL'
          note={
            Number.isFinite(nonHdlMg)
              ? `No-HDL estimado: ${formatNumericScore(nonHdlMg)} mg/dL.`
              : 'Se mostrará el colesterol no-HDL cuando completes ambos campos.'
          }
        />
      </div>
    </ToolPage>
  )
}
