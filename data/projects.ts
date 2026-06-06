export interface Project {
  num: string
  title: string
  description: string
  stack: string[]
  href: string
  liveHref?: string
}

export const projects: Project[] = [
  {
    num: 'TAPE 01',
    title: 'Job Application Tracker',
    description:
      'Full stack tracker with an ML URL parser, a fine-tuned DistilBERT NER model with a deterministic first fallback. Auth, kanban, analytics, dark mode.',
    stack: ['Next.js', 'Supabase', 'DistilBERT', 'Modal'],
    href: 'https://github.com/Brodie191/JobTracker',
    liveHref: 'https://job-tracker-tau-liart.vercel.app/auth/login',
  },
  {
    num: 'TAPE 02',
    title: 'DIGITAL ARCHIVES',
    description: 'Full Stack HI-RES confidential image sharing platform. (A passion project of mine)',
    stack: ['Next.js', 'Supabase'],
    href: '#',
    liveHref:'#',
  },
  {
    num: 'TAPE 03',
    title: 'PASSCRACK',
    description: 'A simple password strength checker and cracker. This was one of my first side projects I made.',
    stack: ['HTML', 'Github'],
    href: 'https://github.com/Brodie191/Passcrack.git',
    liveHref: 'https://brodie191.github.io/Passcrack/',
  },
  {
    num: 'TAPE 04',
    title: 'AICOV',
    description: 'An AI cover letter generator, to get into using AI in my projects.',
    stack: ['Next.js', 'CLAUDE API'],
    href: 'https://github.com/Brodie191/AICOV.git',
    liveHref:'https://ai-cover-letter-generator-iota.vercel.app/',
  },
]
