import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function App() {
  return (
    <div className='layout'>
      <aside className='sidebar'>
        <Sidebar />
      </aside>
      <main className='content'>
        <Outlet />
      </main>
    </div>
  )
}
