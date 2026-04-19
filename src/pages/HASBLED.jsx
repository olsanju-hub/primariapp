import React, { useState, useMemo } from 'react'

export default function HASBLED() {
  const factors = [
    {k:'h', t:'HTA (PAS > 160)', v:1},
    {k:'a', t:'Función renal o hepática alterada', v:1},
    {k:'s', t:'Ictus previo', v:1},
    {k:'b', t:'Sangrado previo/predisposición', v:1},
    {k:'l', t:'INR lábil', v:1},
    {k:'e', t:'Edad > 65', v:1},
    {k:'d', t:'Fármacos/Alcohol', v:1},
  ]
  const [sel, setSel] = useState({})
  const total = useMemo(()=>Object.values(sel).reduce((a,b)=>a+b,0), [sel])
  const set = (k,v,checked) => setSel(s=>({ ...s, [k]: checked ? v : 0 }))

  const interpret = () => {
    if (total <= 1) return 'Riesgo bajo'
    if (total === 2) return 'Riesgo moderado'
    return 'Riesgo alto'
  }

  return (
    <div>
      <h2>HAS-BLED</h2>
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
        <p><strong>Puntuación:</strong> {total} / 9</p>
        <p><strong>Categoría:</strong> {interpret()}</p>
      </div>
    </div>
  )
}
