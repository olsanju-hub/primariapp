import React, { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Home, LayoutGrid } from 'lucide-react'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="p-4 md:p-8 font-sans pb-32 min-h-screen">
      
      {/* HEADER LIMPIO */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <Link to="/">
          <h1 className="text-2xl font-bold text-[#3e5a3e] tracking-tight">Primari<span className="text-[#557c55]">APP</span></h1>
          <p className="text-sm text-[#557c55]/80 font-medium">Asistente de valoración clínica</p>
        </Link>
        <Link to="/" className="p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#557c55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
      </header>

      {/* WORKSPACE PRINCIPAL */}
      <main className="max-w-6xl mx-auto">
        <Outlet />
      </main>

      {/* NAVEGACIÓN INFERIOR FLOTANTE */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-sm bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-full p-2 flex justify-around items-center z-50">
        <Link to="/" className={`p-4 rounded-full transition-all ${location.pathname === '/' ? 'text-[#557c55] bg-slate-50' : 'text-slate-400 hover:bg-slate-50'}`}><Home size={24} /></Link>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-14 h-14 bg-[#557c55] text-white rounded-full shadow-lg shadow-[#557c55]/20 flex items-center justify-center hover:scale-105 transition-transform -mt-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        </button>
        <Link to="/herramientas" className={`p-4 rounded-full transition-all ${location.pathname === '/herramientas' ? 'text-[#557c55] bg-slate-50' : 'text-slate-400 hover:bg-slate-50'}`}><LayoutGrid size={24} /></Link>
      </nav>
    </div>
  )
}
