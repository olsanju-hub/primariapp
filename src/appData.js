import {
  Activity,
  Baby,
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
    id: 'endocrinologia',
    name: 'Endocrinología',
    icon: Activity,
    accent: '#3d9b82',
    soft: '#e7f7f2',
    tools: [
      {
        name: 'Riesgo metabólico',
        blurb: 'Cribado y seguimiento.',
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
    id: 'ginecologia',
    name: 'Ginecología',
    icon: Baby,
    accent: '#d77292',
    soft: '#fff0f5',
    tools: [
      {
        name: 'Riesgo gestacional',
        blurb: 'Seguimiento obstétrico.',
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
    tools: [
      {
        name: 'qSOFA',
        path: '/qsofa',
        blurb: 'Cribado rápido de sepsis.',
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
        name: 'Riesgo respiratorio',
        blurb: 'Patología respiratoria.',
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
    tools: [
      {
        name: 'Percentiles pediátricos',
        blurb: 'Desarrollo y crecimiento.',
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

export const availableTools = toolIndex.filter(({ path }) => Boolean(path))
export const activeSpecialties = specialties
  .map((specialty) => ({
    ...specialty,
    tools: specialty.tools.filter(({ path }) => Boolean(path)),
  }))
  .filter((specialty) => specialty.tools.length > 0)

export const defaultHomeSpecialty = 'urgencias'

export const primaryNav = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Herramientas', path: '/herramientas', icon: LayoutGrid },
]

export const mobileNav = [
  { name: 'Inicio', path: '/', icon: Home },
  { name: 'Lista', path: '/herramientas', icon: LayoutGrid },
  { name: 'qSOFA', path: '/qsofa', icon: ShieldAlert },
  { name: 'PHQ-9', path: '/phq9', icon: Brain },
]
