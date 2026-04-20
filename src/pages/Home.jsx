import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activePage, setActivePage] = useState('home');

  // Clases reutilizables adaptadas del CSS original
  const floatingCardClass =
    'bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_10px_30px_-10px_rgba(62,90,62,0.1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(62,90,62,0.15)] transition-all duration-300';
  
  const pageSectionClass = 'animate-[fadeIn_0.4s_ease-out]';

  return (
    <div
      className="min-h-screen p-4 md:p-8 font-sans pb-24"
      style={{
        backgroundColor: '#f4f7f5',
        backgroundImage: 'radial-gradient(#a3b18a 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Estilos globales para la animación que no están en Tailwind por defecto */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HEADER */}
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#3e5a3e] tracking-tight">
            Primari<span className="text-[#557c55]">APP</span>
          </h1>
          <p className="text-sm text-[#557c55]/80 font-medium">Asistente de valoración clínica</p>
        </div>
        <button
          onClick={() => setActivePage('home')}
          className="p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#557c55]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* HOME */}
        {activePage === 'home' && (
          <section id="home" className={pageSectionClass}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Search Card */}
              <div className={`lg:col-span-2 p-10 rounded-3xl flex flex-col justify-center border-none ${floatingCardClass}`}>
                <h2 className="text-3xl font-bold text-slate-800 mb-6 leading-tight">
                  Explorar por <br />
                  <span className="text-[#557c55]">Especialidad</span>
                </h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar escala, guía o síntoma..."
                    className="w-full p-4 pl-12 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-[#557c55] outline-none transition-all shadow-sm"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Info Card */}
              <div className="p-8 rounded-3xl bg-[#557c55] text-white shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70">Soporte</span>
                  <p className="mt-2 text-lg font-light">Protocolos rápidos segmentados por área clínica.</p>
                </div>
                <div className="mt-6 flex gap-2">
                  <div className="h-1 w-12 bg-white rounded-full"></div>
                  <div className="h-1 w-4 bg-white/30 rounded-full"></div>
                </div>
              </div>

              {/* NEUMOLOGÍA */}
              <div onClick={() => setActivePage('neumo')} className={`p-6 rounded-3xl group cursor-pointer ${floatingCardClass}`}>
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#557c55] group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-slate-800">Neumología</h3>
                <p className="text-sm text-slate-500">Asma, EPOC, Neumonías (CRB-65).</p>
              </div>

              {/* CARDIOLOGÍA */}
              <div onClick={() => setActivePage('cardio')} className={`p-6 rounded-3xl group cursor-pointer ${floatingCardClass}`}>
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#557c55] group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-slate-800">Cardiología</h3>
                <p className="text-sm text-slate-500">HTA, Insuficiencia cardíaca, Riesgo CV.</p>
              </div>

              {/* DIGESTIVO */}
              <div onClick={() => setActivePage('digestivo')} className={`p-6 rounded-3xl group cursor-pointer ${floatingCardClass}`}>
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#557c55] group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-slate-800">Digestivo</h3>
                <p className="text-sm text-slate-500">Apendicitis (Alvarado), Gastritis, IBD.</p>
              </div>

              {/* SALUD MENTAL */}
              <div onClick={() => setActivePage('salud-mental')} className={`p-6 rounded-3xl group cursor-pointer ${floatingCardClass}`}>
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#557c55] group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-slate-800">Salud Mental</h3>
                <p className="text-sm text-slate-500">Depresión (PHQ-9), Ansiedad (GAD-7).</p>
              </div>

              {/* URGENCIAS */}
              <div onClick={() => setActivePage('urgencias')} className={`p-6 rounded-3xl group cursor-pointer border-red-100 bg-[#fff5f5]/50 ${floatingCardClass}`}>
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#991b1b] group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#991b1b] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-[#991b1b]">Urgencias</h3>
                <p className="text-sm text-red-600/70">Triage, Glasgow, Emergencias Vitales.</p>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN NEUMOLOGÍA */}
        {activePage === 'neumo' && (
          <section id="neumo" className={pageSectionClass}>
            <div className="max-w-2xl mx-auto py-10">
              <button onClick={() => setActivePage('home')} className="text-[#557c55] flex items-center gap-2 mb-6 font-semibold hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Volver al panel
              </button>
              <div className={`p-10 rounded-3xl ${floatingCardClass}`}>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Área de Neumología</h2>
                <p className="text-slate-500 mb-6">Selecciona el protocolo o escala requerida para valoración respiratoria.</p>
                <div className="grid grid-cols-1 gap-4">
                  <Link to="/curb65" className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-700 block">
                    Escala CURB-65
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN CARDIOLOGÍA */}
        {activePage === 'cardio' && (
          <section id="cardio" className={pageSectionClass}>
            <div className="max-w-2xl mx-auto py-10">
              <button onClick={() => setActivePage('home')} className="text-[#557c55] flex items-center gap-2 mb-6 font-semibold hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Volver al panel
              </button>
              <div className={`p-10 rounded-3xl ${floatingCardClass}`}>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Área de Cardiología</h2>
                <p className="text-slate-500 mb-6">Selecciona el protocolo o escala requerida para valoración cardiovascular.</p>
                <div className="grid grid-cols-1 gap-4">
                  <Link to="/score2" className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-700 block">Riesgo SCORE2</Link>
                  <Link to="/cha2ds2vasc" className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-700 block">Riesgo ictus (CHA₂DS₂-VASc)</Link>
                  <Link to="/hasbled" className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-700 block">Riesgo sangrado (HAS-BLED)</Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN DIGESTIVO */}
        {activePage === 'digestivo' && (
          <section id="digestivo" className={pageSectionClass}>
            <div className="max-w-2xl mx-auto py-10">
              <button onClick={() => setActivePage('home')} className="text-[#557c55] flex items-center gap-2 mb-6 font-semibold hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Volver al panel
              </button>
              <div className={`p-10 rounded-3xl ${floatingCardClass}`}>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Área de Digestivo</h2>
                <p className="text-slate-500 mb-6">Protocolos para valoración y triaje en patologías digestivas.</p>
                <div className="grid grid-cols-1 gap-4">
                  <Link to="/alvarado" className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-700 block">Escala de Alvarado (Apendicitis)</Link>
                  <Link to="/rockall" className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-700 block">Escala Rockall (HDA)</Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN SALUD MENTAL */}
        {activePage === 'salud-mental' && (
          <section id="salud-mental" className={pageSectionClass}>
            <div className="max-w-2xl mx-auto py-10">
              <button onClick={() => setActivePage('home')} className="text-[#557c55] flex items-center gap-2 mb-6 font-semibold hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Volver al panel
              </button>
              <div className={`p-10 rounded-3xl ${floatingCardClass}`}>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Área de Salud Mental</h2>
                <p className="text-slate-500 mb-6">Herramientas de cribado y seguimiento para trastornos del estado de ánimo.</p>
                <div className="grid grid-cols-1 gap-4">
                  <Link to="/phq9" className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-700 block">Depresión (PHQ-9)</Link>
                  <Link to="/gad7" className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors text-slate-700 block">Ansiedad (GAD-7)</Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN URGENCIAS */}
        {activePage === 'urgencias' && (
          <section id="urgencias" className={pageSectionClass}>
            <div className="max-w-2xl mx-auto py-10">
              <button onClick={() => setActivePage('home')} className="text-[#991b1b] flex items-center gap-2 mb-6 font-semibold hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Volver
              </button>
              <div className={`p-10 rounded-3xl border-red-50 bg-[#fff5f5] ${floatingCardClass}`}>
                <h2 className="text-2xl font-bold text-[#991b1b] mb-4">Protocolos de Urgencia</h2>
                <div className="grid grid-cols-1 gap-4 mt-6">
                  <Link to="/news2" className="p-4 bg-white rounded-xl border border-red-100 shadow-sm hover:bg-red-50 transition-colors text-slate-700 block">NEWS2 (Deterioro Clínico)</Link>
                  <Link to="/wells-tvp" className="p-4 bg-white rounded-xl border border-red-100 shadow-sm hover:bg-red-50 transition-colors text-slate-700 block">Escala Wells (TVP)</Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* NAVIGATION BAR */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-sm bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-full p-2 flex justify-around items-center z-50">
        <button onClick={() => setActivePage('home')} className="p-4 rounded-full text-[#557c55] hover:bg-slate-50 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-[#557c55] text-white rounded-full shadow-lg shadow-[#557c55]/20 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        <button className="p-4 rounded-full text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
      </nav>
    </div>
  );
}