export interface Project {
  num: string
  title: string
  description: string
  stack: string[]
  href: string
}

export const projects: Project[] = [
  {
    num: 'VHS STYLE 01',
    title: 'Job Application Tracker',
    description:
      'Full-stack tracker with an ML URL parser — a fine-tuned DistilBERT NER model with a deterministic-first fallback. Auth, kanban, analytics, dark mode.',
    stack: ['Next.js', 'Supabase', 'DistilBERT', 'Modal'],
    href: '#',
  },
  {
    num: 'VHS STYLE 02',
    title: 'Project Two',
    description: 'One or two lines on what it does and why it was hard. Keep it punchy.',
    stack: ['Tech', 'Tech'],
    href: '#',
  },
  {
    num: 'VHS STYLE 03',
    title: 'Project Three',
    description: 'Another short blurb. Link out to the repo or live demo.',
    stack: ['Tech', 'Tech'],
    href: '#',
  },
  {
    num: 'VHS STYLE 04',
    title: 'Project Four',
    description: 'Add as many tiles as you like — the grid wraps automatically.',
    stack: ['Tech', 'Tech'],
    href: '#',
  },
]
