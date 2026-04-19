import {
  Brain,
  Heart,
  Home,
  LayoutGrid,
  ShieldAlert,
  Stethoscope,
  Thermometer,
  Users,
} from 'lucide-react'

export const specialties = [
  {
    id: 'urgencias',
    name: 'Urgencias',
    icon: ShieldAlert,
    accent: '#ef7f4e',
    soft: '#fff1e8',
    tools: [
      {
        name: 'qSOFA',
        path: '/qsofa',
        blurb: 'Cribado rápido de sepsis.',
        status: 'Operativa',
      },
      {
        name: 'NEWS2',
        path: '/news2',
        blurb: 'Detección de deterioro agudo.',
        status: 'Operativa',
      },
      {
        name: 'Wells TVP',
        path: '/wells-tvp',
        blurb: 'Probabilidad clínica de TVP.',
        status: 'Operativa',
      },
    ],
  },
  {
    id: 'atencion-primaria',
    name: 'Atención Primaria',
    icon: Stethoscope,
    accent: '#3487b5',
    soft: '#eaf7fb',
    tools: [
      {
        name: 'Centor/McIsaac',
        path: '/centor-mcisaac',
        blurb: 'Faringoamigdalitis aguda.',
        status: 'Operativa',
      },
      {
        name: 'FINDRISC',
        path: '/findrisc',
        blurb: 'Riesgo de diabetes tipo 2.',
        status: 'Operativa',
      },
    ],
  },
  {
    id: 'cardiologia',
    name: 'Cardiología',
    icon: Heart,
    accent: '#2f72de',
    soft: '#e8f1ff',
    tools: [
      {
        name: 'CHA₂DS₂-VASc',
        path: '/cha2ds2vasc',
        blurb: 'Riesgo tromboembólico en FA.',
        status: 'Operativa',
      },
      {
        name: 'HAS-BLED',
        path: '/hasbled',
        blurb: 'Riesgo hemorrágico.',
        status: 'Operativa',
      },
      {
        name: 'SCORE2',
        path: '/score2',
        blurb: 'Riesgo cardiovascular preventivo.',
        status: 'En preparación',
      },
    ],
  },
  {
    id: 'geriatria',
    name: 'Geriatría',
    icon: Users,
    accent: '#7e6ad9',
    soft: '#f0ecff',
    tools: [
      {
        name: 'Índice de Barthel',
        path: '/barthel',
        blurb: 'Dependencia en ABVD.',
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
    tools: [
      {
        name: 'CRB-65',
        path: '/crb65',
        blurb: 'Neumonía adquirida en la comunidad.',
        status: 'Operativa',
      },
    ],
  },
  {
    id: 'salud-mental',
    name: 'Salud Mental',
    icon: Brain,
    accent: '#5b70d6',
    soft: '#eef1ff',
    tools: [
      {
        name: 'PHQ-9',
        path: '/phq9',
        blurb: 'Síntomas depresivos.',
        status: 'Operativa',
      },
      {
        name: 'GAD-7',
        path: '/gad7',
        blurb: 'Ansiedad generalizada.',
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

export const availableTools = toolIndex.filter(
  ({ path, status }) => Boolean(path) && status === 'Operativa'
)
export const plannedTools = toolIndex.filter(({ status }) => status !== 'Operativa')

export const activeSpecialties = specialties
  .map((specialty) => ({
    ...specialty,
    tools: specialty.tools.filter(({ path, status }) => Boolean(path) && status === 'Operativa'),
  }))
  .filter((specialty) => specialty.tools.length > 0)

export const defaultHomeSpecialty = 'urgencias'

export const featuredTools = availableTools.filter(({ path }) =>
  ['/qsofa', '/news2', '/centor-mcisaac', '/cha2ds2vasc'].includes(path)
)

export const catalogStats = {
  activeTools: availableTools.length,
  plannedTools: plannedTools.length,
  activeSpecialties: activeSpecialties.length,
}

export const primaryNav = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Herramientas', path: '/herramientas', icon: LayoutGrid },
]

export const mobileNav = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Lista', path: '/herramientas', icon: LayoutGrid },
  { name: 'qSOFA', path: '/qsofa', icon: ShieldAlert },
  { name: 'NEWS2', path: '/news2', icon: Heart },
]
