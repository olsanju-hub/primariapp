import React, { useState } from 'react'

export default function QSOFA() {
  const [fr, setFr] = useState(false)
  const [pas, setPas] = useState(false)
  const [gcs, setGcs] = useState(false)
  const total = (fr?1:0) + (pas?1:0) + (gcs?1:0)

  return (
    <div>
      <h2>qSOFA</h2>
      <div className='card'>
        <label className='label'><input type='checkbox' onChange={e=>setFr(e.target.checked)} />FR ≥ 22/min</label>
        <label className='label'><input type='checkbox' onChange={e=>setPas(e.target.checked)} />PAS ≤ 100 mmHg</label>
        <label className='label'><input type='checkbox' onChange={e=>setGcs(e.target.checked)} />Glasgow &lt; 15</label>
      </div>
      <div className='card' style={{marginTop:16}}>
        <p><strong>Puntuación:</strong> {total} / 3</p>
        <p>{total >= 2 ? '⚠️ Alto riesgo de mala evolución' : 'Riesgo bajo'}</p>
      </div>
    </div>
  )
}
