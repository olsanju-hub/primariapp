import React, { useState, useMemo } from 'react'

export default function CHA2DS2VASc() {
  const factors = [
    {k:'insuf', t:'Insuficiencia cardiaca', v:1},
    {k:'htn', t:'Hipertensión', v:1},
    {k:'age75', t:'Edad ≥ 75 años', v:2},
    {k:'dm', t:'Diabetes', v:1},
    {k:'stroke', t:'Ictus/AIT/TE previo', v:2},
    {k:'vasc', t:'Enfermedad vascular', v:1},
    {k:'age6574', t:'Edad 65–74 años', v:1},
    {k:'female', t:'Sexo femenino', v:1},
  ]
  const [sel, setSel] = useState({})
  const total = useMemo(()=>Object.values(sel).reduce((a,b)=>a+b,0), [sel])
  const set = (k,v,checked) => setSel(s=>({ ...s, [k]: checked ? v : 0 }))

  const interpret = () => {
    if (total === 0) return 'Bajo riesgo'
    if (total === 1) return 'Riesgo intermedio'
    return 'Alto riesgo'
  }

  return (
    <div>
      <h2>CHA₂DS₂-VASc</h2>
      <div className='grid'>
        {factors.map(f => (
          <div key={f.k} className='card'>
            <label className='label'>
              <input type='checkbox' onChange={(e)=>set(f.k, f.v, e.target.checked)} />
              <span>{f.t} <span className='badge'>+{f.v}</span></span>
            </label>
          </div>
        ))}
      </div>
      <div className='card' style={{marginTop:16}}>
        <p><strong>Puntuación:</strong> {total}</p>
        <p><strong>Categoría:</strong> {interpret()}</p>
      </div>
    </div>
  )
}
