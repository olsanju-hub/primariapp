import React, { useMemo, useState } from 'react'
import { getNews2Assessment } from '../scoreUtils'
import ToolPage from '../ToolPage'

const respiratoryRateOptions = [
  { id: 'rr-8', label: '≤ 8 rpm', points: 3 },
  { id: 'rr-9-11', label: '9 - 11 rpm', points: 1 },
  { id: 'rr-12-20', label: '12 - 20 rpm', points: 0 },
  { id: 'rr-21-24', label: '21 - 24 rpm', points: 2 },
  { id: 'rr-25', label: '≥ 25 rpm', points: 3 },
]

const saturationScale1Options = [
  { id: 'sat1-96', label: '≥ 96 %', points: 0 },
  { id: 'sat1-94-95', label: '94 - 95 %', points: 1 },
  { id: 'sat1-92-93', label: '92 - 93 %', points: 2 },
  { id: 'sat1-91', label: '≤ 91 %', points: 3 },
]

const saturationScale2AirOptions = [
  { id: 'sat2-air-93', label: '≥ 93 % en aire', points: 0 },
  { id: 'sat2-air-88-92', label: '88 - 92 %', points: 0 },
  { id: 'sat2-air-86-87', label: '86 - 87 %', points: 1 },
  { id: 'sat2-air-84-85', label: '84 - 85 %', points: 2 },
  { id: 'sat2-air-83', label: '≤ 83 %', points: 3 },
]

const saturationScale2OxygenOptions = [
  { id: 'sat2-o2-88-92', label: '88 - 92 %', points: 0 },
  { id: 'sat2-o2-93-94', label: '93 - 94 % con O₂', points: 1 },
  { id: 'sat2-o2-95-96', label: '95 - 96 % con O₂', points: 2 },
  { id: 'sat2-o2-97', label: '≥ 97 % con O₂', points: 3 },
  { id: 'sat2-o2-86-87', label: '86 - 87 %', points: 1 },
  { id: 'sat2-o2-84-85', label: '84 - 85 %', points: 2 },
  { id: 'sat2-o2-83', label: '≤ 83 %', points: 3 },
]

const oxygenOptions = [
  { id: 'o2-no', label: 'Aire ambiente', points: 0 },
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
  { id: 'new-confusion', label: 'Nueva confusión / voz / dolor / no responde', points: 3 },
]

const saturationScaleOptions = [
  { id: 'scale-1', label: 'Scale 1', subtitle: 'Habitual', points: 0 },
  { id: 'scale-2', label: 'Scale 2', subtitle: 'Hipercapnia confirmada', points: 0 },
]

function getPoints(options, id) {
  return options.find((option) => option.id === id)?.points ?? 0
}

function FieldCard({ index, label, options, value, onChange, name }) {
  return (
    <section className='question-card'>
      <div className='question-card-head'>
        <span className='question-index'>{String(index).padStart(2, '0')}</span>
        <h4>{label}</h4>
      </div>

      <div className='option-stack'>
        {options.map((option) => (
          <label
            key={option.id}
            className={value === option.id ? 'choice-card choice-card--selected' : 'choice-card'}
          >
            <input
              type='radio'
              name={name}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span>{option.label}</span>
            <strong>{option.points > 0 ? `+${option.points}` : option.points}</strong>
          </label>
        ))}
      </div>
    </section>
  )
}

export default function NEWS2() {
  const [saturationScale, setSaturationScale] = useState('scale-1')
  const [respiratoryRate, setRespiratoryRate] = useState('rr-12-20')
  const [saturation, setSaturation] = useState('sat1-96')
  const [oxygen, setOxygen] = useState('o2-no')
  const [temperature, setTemperature] = useState('temp-36-38')
  const [systolic, setSystolic] = useState('sbp-111-219')
  const [heartRate, setHeartRate] = useState('hr-51-90')
  const [alertness, setAlertness] = useState('alert')

  const respiratoryRatePoints = getPoints(respiratoryRateOptions, respiratoryRate)
  const oxygenPoints = getPoints(oxygenOptions, oxygen)
  const temperaturePoints = getPoints(temperatureOptions, temperature)
  const systolicPoints = getPoints(systolicOptions, systolic)
  const heartRatePoints = getPoints(heartRateOptions, heartRate)
  const alertnessPoints = getPoints(alertnessOptions, alertness)

  const saturationOptions =
    saturationScale === 'scale-2'
      ? oxygen === 'o2-yes'
        ? saturationScale2OxygenOptions
        : saturationScale2AirOptions
      : saturationScale1Options

  const saturationPoints = getPoints(saturationOptions, saturation)

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

  const { interpretation, conduct, tone } = getNews2Assessment(total, hasSingleCritical)

  const handleSaturationScaleChange = (nextScale) => {
    setSaturationScale(nextScale)
    setOxygen('o2-no')
    setSaturation(nextScale === 'scale-2' ? 'sat2-air-93' : 'sat1-96')
  }

  const handleOxygenChange = (nextOxygen) => {
    setOxygen(nextOxygen)

    if (saturationScale === 'scale-2') {
      setSaturation(nextOxygen === 'o2-yes' ? 'sat2-o2-88-92' : 'sat2-air-93')
    }
  }

  return (
    <ToolPage
      specialty='Urgencias'
      title='NEWS2'
      description='Valoración rápida de gravedad fisiológica y detección de deterioro agudo.'
      clinicalUse='Prioriza monitorización, frecuencia de reevaluación y escalada asistencial.'
      whenToUse='Valoración inicial o seriada en urgencias, observación y pacientes agudos.'
      scoreLabel='Puntuación NEWS2'
      scoreValue={`${total}`}
      interpretation={interpretation}
      conduct={conduct}
      note='Usa SpO₂ scale 2 solo si existe insuficiencia respiratoria hipercápnica confirmada o diana 88-92% indicada por un clínico competente.'
      tone={tone}
    >
      <div className='question-grid'>
        <section className='question-card'>
          <div className='question-card-head'>
            <span className='question-index'>01</span>
            <h4>Escala de saturación</h4>
          </div>

          <div className='option-stack option-stack--inline'>
            {saturationScaleOptions.map((option) => (
              <label
                key={option.id}
                className={
                  saturationScale === option.id
                    ? 'choice-card choice-card--selected'
                    : 'choice-card'
                }
              >
                <input
                  type='radio'
                  name='news2-scale'
                  checked={saturationScale === option.id}
                  onChange={() => handleSaturationScaleChange(option.id)}
                />
                <span>{`${option.label} · ${option.subtitle}`}</span>
                <strong>0</strong>
              </label>
            ))}
          </div>
        </section>

        <FieldCard
          index={2}
          label='Frecuencia respiratoria'
          options={respiratoryRateOptions}
          value={respiratoryRate}
          onChange={setRespiratoryRate}
          name='news2-rr'
        />

        <FieldCard
          index={3}
          label='Saturación de oxígeno'
          options={saturationOptions}
          value={saturation}
          onChange={setSaturation}
          name='news2-sat'
        />

        <FieldCard
          index={4}
          label='Oxígeno suplementario'
          options={oxygenOptions}
          value={oxygen}
          onChange={handleOxygenChange}
          name='news2-o2'
        />

        <FieldCard
          index={5}
          label='Temperatura'
          options={temperatureOptions}
          value={temperature}
          onChange={setTemperature}
          name='news2-temp'
        />

        <FieldCard
          index={6}
          label='PAS'
          options={systolicOptions}
          value={systolic}
          onChange={setSystolic}
          name='news2-sbp'
        />

        <FieldCard
          index={7}
          label='Frecuencia cardiaca'
          options={heartRateOptions}
          value={heartRate}
          onChange={setHeartRate}
          name='news2-hr'
        />

        <FieldCard
          index={8}
          label='Estado de conciencia'
          options={alertnessOptions}
          value={alertness}
          onChange={setAlertness}
          name='news2-alertness'
        />
      </div>
    </ToolPage>
  )
}
