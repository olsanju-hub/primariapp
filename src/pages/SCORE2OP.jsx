import React, { useMemo, useState } from 'react'
import { ChoiceField, NumberField } from '../components/CardioFieldCards'
import {
  calculateScore2OpRisk,
  formatNumericScore,
  getScore2Assessment,
} from '../scoreUtils'
import ToolPage from '../ToolPage'

const scopeOptions = [
  { value: 'eligible', label: 'Población válida para SCORE2-OP', meta: 'Apta' },
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

export default function SCORE2OP() {
  const [scope, setScope] = useState('eligible')
  const [sex, setSex] = useState('male')
  const [smoking, setSmoking] = useState('no')
  const [region, setRegion] = useState('low')
  const [ageInput, setAgeInput] = useState('75')
  const [sbpInput, setSbpInput] = useState('140')
  const [totalCholInput, setTotalCholInput] = useState('190')
  const [hdlInput, setHdlInput] = useState('50')

  const age = Number.parseFloat(ageInput)
  const systolicBp = Number.parseFloat(sbpInput)
  const totalCholMg = Number.parseFloat(totalCholInput)
  const hdlMg = Number.parseFloat(hdlInput)
  const totalCholMmol = Number.isFinite(totalCholMg) ? mgDlToMmol(totalCholMg) : NaN
  const hdlMmol = Number.isFinite(hdlMg) ? mgDlToMmol(hdlMg) : NaN
  const nonHdlMg = Number.isFinite(totalCholMg) && Number.isFinite(hdlMg) ? totalCholMg - hdlMg : NaN

  const outsideValidatedPopulation = scope === 'outside'
  const ageInRange = Number.isFinite(age) && age >= 70 && age <= 89

  const riskPercent = useMemo(() => {
    if (outsideValidatedPopulation || !ageInRange) {
      return null
    }

    return calculateScore2OpRisk({
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
    ? 'Expresa riesgo cardiovascular a 10 años solo en prevención primaria y no debe usarse fuera de la población validada.'
    : Number.isFinite(riskPercent)
      ? `${formatNumericScore(riskPercent)}% a 10 años corresponde a riesgo ${category.toLowerCase()} en la población mayor.`
      : 'Expresa el riesgo de primer evento aterosclerótico fatal o no fatal a 10 años en personas de 70 a 89 años.'

  const scoreValue = outsideValidatedPopulation
    ? 'Fuera de ámbito'
    : ageInRange && Number.isFinite(riskPercent)
      ? `${formatNumericScore(riskPercent)} %`
      : 'Pendiente'

  const dynamicNote = !ageInRange && scope !== 'outside'
    ? 'SCORE2-OP está pensado para 70 a 89 años. Por debajo de 70 años usa SCORE2.'
    : 'Usa la versión para personas mayores. España pertenece a la región de bajo riesgo y la introducción de colesterol se hace en mg/dL con conversión interna.'

  return (
    <ToolPage
      specialty='Cardiología'
      status='Operativa'
      title='SCORE2-OP'
      description='Estimación de riesgo cardiovascular a 10 años para prevención primaria en personas de 70 a 89 años.'
      clinicalUse='Permite graduar el riesgo aterosclerótico en personas mayores sin enfermedad cardiovascular establecida.'
      whenToUse='Pacientes de 70 a 89 años aparentemente sanos, sin ASCVD, diabetes, ERC moderada-grave ni trastornos raros de lípidos o presión arterial.'
      whatIs='Versión de SCORE2 adaptada a personas mayores.'
      whatFor='Sirve para ajustar la prevención cardiovascular en edades avanzadas.'
      valueMeaning={valueMeaning}
      scoreLabel='Riesgo SCORE2-OP'
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
          name='score2op-scope'
          wide
        />

        <NumberField
          index={2}
          label='Edad'
          helper='SCORE2-OP se usa de 70 a 89 años.'
          value={ageInput}
          onChange={setAgeInput}
          placeholder='75'
          unit='años'
        />

        <ChoiceField
          index={3}
          label='Sexo'
          options={sexOptions}
          value={sex}
          onChange={setSex}
          name='score2op-sex'
        />

        <ChoiceField
          index={4}
          label='Región SCORE2-OP'
          helper='España pertenece a la región de bajo riesgo.'
          options={regionOptions}
          value={region}
          onChange={setRegion}
          name='score2op-region'
          wide
        />

        <ChoiceField
          index={5}
          label='Tabaquismo'
          options={smokingOptions}
          value={smoking}
          onChange={setSmoking}
          name='score2op-smoking'
        />

        <NumberField
          index={6}
          label='Presión arterial sistólica'
          value={sbpInput}
          onChange={setSbpInput}
          placeholder='140'
          unit='mmHg'
        />

        <NumberField
          index={7}
          label='Colesterol total'
          helper='Introduce el valor en mg/dL.'
          value={totalCholInput}
          onChange={setTotalCholInput}
          placeholder='190'
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
