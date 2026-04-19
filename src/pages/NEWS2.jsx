import React, { useMemo, useState } from 'react'
import ToolPage from '../ToolPage'

export default function NEWS2() {
  const respiratoryRateOptions = [
    { id: 'rr-8', label: '≤ 8 rpm', points: 3 },
    { id: 'rr-9-11', label: '9 - 11 rpm', points: 1 },
    { id: 'rr-12-20', label: '12 - 20 rpm', points: 0 },
    { id: 'rr-21-24', label: '21 - 24 rpm', points: 2 },
    { id: 'rr-25', label: '≥ 25 rpm', points: 3 },
  ]
  const saturationOptions = [
    { id: 'sat-96', label: '≥ 96 %', points: 0 },
    { id: 'sat-94-95', label: '94 - 95 %', points: 1 },
    { id: 'sat-92-93', label: '92 - 93 %', points: 2 },
    { id: 'sat-91', label: '≤ 91 %', points: 3 },
  ]
  const oxygenOptions = [
    { id: 'o2-no', label: 'No precisa oxígeno', points: 0 },
    { id: 'o2-yes', label: 'Oxígeno suplementario', points: 2 },
  ]
  const temperatureOptions = [
    { id: 'temp-35', label: '≤ 35,0 °C', points: 3 },
    { id: 'temp-35-36', label: '35,1 - 36,0 °C', points: 1 },
    { id: 'temp-36-38', label: '36,1 - 38,0 °C', points: 0 },
    { id: 'temp-38-39', label: '38,1 - 39,0 °C', points: 1 },
    { id: 'temp-39', label: '≥ 39,1 °C', points: 2 },
  ]
  const systolicOptions = [
    { id: 'sbp-90', label: '≤ 90 mmHg', points: 3 },
    { id: 'sbp-91-100', label: '91 - 100 mmHg', points: 2 },
    { id: 'sbp-101-110', label: '101 - 110 mmHg', points: 1 },
    { id: 'sbp-111-219', label: '111 - 219 mmHg', points: 0 },
    { id: 'sbp-220', label: '≥ 220 mmHg', points: 3 },
  ]
  const heartRateOptions = [
    { id: 'hr-40', label: '≤ 40 lpm', points: 3 },
    { id: 'hr-41-50', label: '41 - 50 lpm', points: 1 },
    { id: 'hr-51-90', label: '51 - 90 lpm', points: 0 },
    { id: 'hr-91-110', label: '91 - 110 lpm', points: 1 },
    { id: 'hr-111-130', label: '111 - 130 lpm', points: 2 },
    { id: 'hr-131', label: '≥ 131 lpm', points: 3 },
  ]
  const alertnessOptions = [
    { id: 'alert', label: 'Alerta', points: 0 },
    { id: 'new-confusion', label: 'Confusión o nueva alteración', points: 3 },
  ]

  const [respiratoryRate, setRespiratoryRate] = useState('rr-12-20')
  const [saturation, setSaturation] = useState('sat-96')
  const [oxygen, setOxygen] = useState('o2-no')
  const [temperature, setTemperature] = useState('temp-36-38')
  const [systolic, setSystolic] = useState('sbp-111-219')
  const [heartRate, setHeartRate] = useState('hr-51-90')
  const [alertness, setAlertness] = useState('alert')

  const getPoints = (options, id) => options.find((option) => option.id === id)?.points ?? 0

  const respiratoryRatePoints = getPoints(respiratoryRateOptions, respiratoryRate)
  const saturationPoints = getPoints(saturationOptions, saturation)
  const oxygenPoints = getPoints(oxygenOptions, oxygen)
  const temperaturePoints = getPoints(temperatureOptions, temperature)
  const systolicPoints = getPoints(systolicOptions, systolic)
  const heartRatePoints = getPoints(heartRateOptions, heartRate)
  const alertnessPoints = getPoints(alertnessOptions, alertness)

  const total = useMemo(
    () =>
      respiratoryRatePoints +
      saturationPoints +
      oxygenPoints +
      temperaturePoints +
      systolicPoints +
      heartRatePoints +
      alertnessPoints,
    [
      alertnessPoints,
      heartRatePoints,
      oxygenPoints,
      respiratoryRatePoints,
      saturationPoints,
      systolicPoints,
      temperaturePoints,
    ]
  )

  const hasSingleCritical = [
    respiratoryRatePoints,
    saturationPoints,
    temperaturePoints,
    systolicPoints,
    heartRatePoints,
    alertnessPoints,
  ].some((value) => value === 3)

  const interpretation = () => {
    if (total >= 7) return 'Riesgo alto'
    if (total >= 5 || hasSingleCritical) return 'Riesgo intermedio'
    return 'Riesgo bajo'
  }

  const conduct = () => {
    if (total >= 7) {
      return 'Escalada urgente, monitorización continua y respuesta clínica inmediata.'
    }
    if (total >= 5 || hasSingleCritical) {
      return 'Revisión médica urgente, reevaluación frecuente y ajuste del nivel asistencial.'
    }
    return 'Seguimiento clínico y reevaluación seriada si cambia la situación.'
  }

  const tone = total >= 7 ? 'critical' : total >= 5 || hasSingleCritical ? 'warning' : 'positive'

  const groups = [
    {
      label: 'Frecuencia respiratoria',
      options: respiratoryRateOptions,
      value: respiratoryRate,
      onChange: setRespiratoryRate,
    },
    {
      label: 'Saturación de oxígeno',
      options: saturationOptions,
      value: saturation,
      onChange: setSaturation,
    },
    {
      label: 'Oxígeno suplementario',
      options: oxygenOptions,
      value: oxygen,
      onChange: setOxygen,
    },
    {
      label: 'Temperatura',
      options: temperatureOptions,
      value: temperature,
      onChange: setTemperature,
    },
    {
      label: 'PAS',
      options: systolicOptions,
      value: systolic,
      onChange: setSystolic,
    },
    {
      label: 'Frecuencia cardiaca',
      options: heartRateOptions,
      value: heartRate,
      onChange: setHeartRate,
    },
    {
      label: 'Estado de conciencia',
      options: alertnessOptions,
      value: alertness,
      onChange: setAlertness,
    },
  ]

  return (
    <ToolPage
      specialty='Urgencias'
      title='NEWS2'
      description='Sistema de alerta temprana para detectar deterioro fisiológico agudo.'
      clinicalUse='Ayuda a priorizar reevaluación, escalada y monitorización.'
      whenToUse='Urgencias, planta, observación y valoración de pacientes inestables.'
      scoreLabel='Puntuación NEWS2'
      scoreValue={`${total}`}
      interpretation={interpretation()}
      conduct={conduct()}
      note='Un único parámetro con 3 puntos ya exige revisión clínica urgente aunque la suma total sea baja.'
      tone={tone}
    >
      <div className='question-grid'>
        {groups.map((group, index) => (
          <section key={group.label} className='question-card'>
            <div className='question-card-head'>
              <span className='question-index'>{String(index + 1).padStart(2, '0')}</span>
              <h4>{group.label}</h4>
            </div>

            <div className='option-stack'>
              {group.options.map((option) => (
                <label
                  key={option.id}
                  className={
                    group.value === option.id
                      ? 'choice-card choice-card--selected'
                      : 'choice-card'
                  }
                >
                  <input
                    type='radio'
                    name={group.label}
                    checked={group.value === option.id}
                    onChange={() => group.onChange(option.id)}
                  />
                  <span>{option.label}</span>
                  <strong>{option.points > 0 ? `+${option.points}` : option.points}</strong>
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ToolPage>
  )
}
