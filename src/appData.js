import {
  Activity,
  Baby,
  Brain,
  Heart,
  Home,
  Info,
  LayoutGrid,
  ShieldAlert,
  Stethoscope,
  Syringe,
  Thermometer,
  Users,
} from 'lucide-react'

export const specialties = [
  {
    id: 'cardiologia',
    name: 'Cardiología',
    icon: Heart,
    accent: '#2f72de',
    soft: '#e8f1ff',
    summary: 'Riesgo tromboembólico, sangrado y estratificación cardiovascular.',
    tools: [
      {
        name: 'CHA₂DS₂-VASc',
        path: '/cha2ds2vasc',
        blurb: 'Estimación del riesgo tromboembólico en fibrilación auricular.',
        status: 'Operativa',
      },
      {
        name: 'HAS-BLED',
        path: '/hasbled',
        blurb: 'Evaluación del riesgo hemorrágico antes de anticoagular.',
        status: 'Operativa',
      },
      {
        name: 'SCORE2',
        path: '/score2',
        blurb: 'Módulo de riesgo cardiovascular preventivo en despliegue.',
        status: 'En preparación',
      },
    ],
  },
  {
    id: 'endocrinologia',
    name: 'Endocrinología',
    icon: Activity,
    accent: '#3d9b82',
    soft: '#e7f7f2',
    summary: 'Herramientas metabólicas y seguimiento de riesgo asociado.',
    tools: [
      {
        name: 'Riesgo metabólico',
        blurb: 'Panel previsto para cribado y seguimiento de diabetes.',
        status: 'Próximamente',
      },
    ],
  },
  {
    id: 'geriatria',
    name: 'Geriatría',
    icon: Users,
    accent: '#7e6ad9',
    soft: '#f0ecff',
    summary: 'Dependencia funcional, autonomía y apoyo en planificación de cuidados.',
    tools: [
      {
        name: 'Índice de Barthel',
        path: '/barthel',
        blurb: 'Valoración funcional para actividades básicas de la vida diaria.',
        status: 'Operativa',
      },
    ],
  },
  {
    id: 'ginecologia',
    name: 'Ginecología',
    icon: Baby,
    accent: '#d77292',
    soft: '#fff0f5',
    summary: 'Accesos rápidos para seguimiento gestacional y salud de la mujer.',
    tools: [
      {
        name: 'Riesgo gestacional',
        blurb: 'Herramienta prevista para seguimiento obstétrico en consulta.',
        status: 'Próximamente',
      },
    ],
  },
  {
    id: 'urgencias',
    name: 'Urgencias',
    icon: ShieldAlert,
    accent: '#ef7f4e',
    soft: '#fff1e8',
    summary: 'Estratificación inicial y apoyo a decisiones rápidas en valoración aguda.',
    tools: [
      {
        name: 'qSOFA',
        path: '/qsofa',
        blurb: 'Identificación rápida de pacientes con posible sepsis y mala evolución.',
        status: 'Operativa',
      },
    ],
  },
  {
    id: 'neumologia',
    name: 'Neumología',
    icon: Thermometer,
    accent: '#4597a9',
    soft: '#e8f8fb',
    summary: 'Espacio reservado para escalas respiratorias y soporte en consulta.',
    tools: [
      {
        name: 'Riesgo respiratorio',
        blurb: 'Módulo pendiente para patología respiratoria crónica y aguda.',
        status: 'Próximamente',
      },
    ],
  },
  {
    id: 'pediatria',
    name: 'Pediatría',
    icon: Stethoscope,
    accent: '#5d8cce',
    soft: '#ecf4ff',
    summary: 'Accesos pediátricos previstos para valoración rápida en consulta.',
    tools: [
      {
        name: 'Percentiles pediátricos',
        blurb: 'Herramienta prevista para cribado y seguimiento del desarrollo.',
        status: 'Próximamente',
      },
    ],
  },
  {
    id: 'psiquiatria',
    name: 'Psiquiatría',
    icon: Brain,
    accent: '#5b70d6',
    soft: '#eef1ff',
    summary: 'Cribado estructurado de síntomas ansiosos y depresivos.',
    tools: [
      {
        name: 'PHQ-9',
        path: '/phq9',
        blurb: 'Cuantificación de síntomas depresivos y severidad clínica.',
        status: 'Operativa',
      },
      {
        name: 'GAD-7',
        path: '/gad7',
        blurb: 'Cribado y seguimiento de ansiedad generalizada.',
        status: 'Operativa',
      },
    ],
  },
]

export const toolIndex = specialties.flatMap((specialty) =>
  specialty.tools.map((tool) => ({
    ...tool,
    specialty: specialty.name,
    accent: specialty.accent,
    soft: specialty.soft,
    icon: specialty.icon,
  }))
)

export const availableTools = toolIndex.filter(({ path }) => Boolean(path))

export const favoriteTools = availableTools.filter(({ path }) =>
  ['/cha2ds2vasc', '/barthel', '/qsofa'].includes(path)
)

export const quickAccess = availableTools.filter(({ path }) =>
  ['/cha2ds2vasc', '/hasbled', '/barthel', '/qsofa', '/phq9'].includes(path)
)

export const primaryNav = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Herramientas', path: '/herramientas', icon: LayoutGrid },
  { name: 'Acerca de', path: '/about', icon: Info },
]

export const mobileNav = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Tools', path: '/herramientas', icon: LayoutGrid },
  { name: 'Urgencias', path: '/qsofa', icon: Syringe },
  { name: 'Mental', path: '/phq9', icon: Brain },
]

const routeMeta = [
  {
    path: '/',
    title: 'Panel clínico',
    specialty: 'Atención Primaria',
    description: 'Busca una herramienta, revisa accesos rápidos y entra en las escalas más utilizadas.',
  },
  {
    path: '/about',
    title: 'Marco de uso',
    specialty: 'PrimariAPP',
    description: 'Alcance clínico, propósito del proyecto y principios de uso seguro en consulta.',
  },
  {
    path: '/herramientas',
    title: 'Todas las herramientas',
    specialty: 'Exploración',
    description: 'Listado clínico único para recorrer las escalas activas y las próximas incorporaciones.',
  },
  {
    path: '/barthel',
    title: 'Índice de Barthel',
    specialty: 'Geriatría',
    description: 'Valoración funcional estructurada para autonomía en actividades básicas.',
  },
  {
    path: '/phq9',
    title: 'PHQ-9',
    specialty: 'Psiquiatría',
    description: 'Cribado breve de depresión con severidad y orientación de seguimiento.',
  },
  {
    path: '/gad7',
    title: 'GAD-7',
    specialty: 'Psiquiatría',
    description: 'Evaluación breve de ansiedad generalizada y control evolutivo.',
  },
  {
    path: '/cha2ds2vasc',
    title: 'CHA₂DS₂-VASc',
    specialty: 'Cardiología',
    description: 'Estratificación del riesgo tromboembólico en fibrilación auricular.',
  },
  {
    path: '/hasbled',
    title: 'HAS-BLED',
    specialty: 'Cardiología',
    description: 'Aproximación estructurada al riesgo hemorrágico en anticoagulación.',
  },
  {
    path: '/qsofa',
    title: 'qSOFA',
    specialty: 'Urgencias',
    description: 'Apoyo a la detección rápida de sepsis y mala evolución clínica.',
  },
  {
    path: '/score2',
    title: 'SCORE2',
    specialty: 'Cardiología',
    description: 'Espacio preparado para riesgo cardiovascular preventivo y decisiones compartidas.',
  },
]

export function findRouteMeta(pathname) {
  return routeMeta.find((entry) => entry.path === pathname) ?? routeMeta[0]
}

export const overviewStats = [
  {
    label: 'Especialidades activas',
    value: `${specialties.length}`,
    detail: 'Panel unificado de navegación clínica',
  },
  {
    label: 'Herramientas operativas',
    value: `${availableTools.length}`,
    detail: 'Escalas listas para uso en consulta',
  },
  {
    label: 'Accesos rápidos',
    value: '2 rutas',
    detail: 'Favoritos y seguimiento longitudinal',
  },
]

export const aboutHighlights = [
  {
    title: 'Uso orientado a consulta',
    description: 'Cada módulo está pensado para apoyar decisiones rápidas, documentables y legibles.',
  },
  {
    title: 'Jerarquía clínica clara',
    description: 'Los resultados se presentan con interpretación y conducta sugerida en el mismo contexto.',
  },
  {
    title: 'Diseño para movilidad',
    description: 'La navegación se adapta a escritorio, tablet y móvil sin duplicar ruido visual.',
  },
]
