'use client'

export default function MenuNav() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const triggerGlitch = (e: React.MouseEvent) => {
    e.preventDefault()
    const root = document.querySelector('.crt-root') as HTMLElement | null
    if (!root) return
    // restart the animation even if fired mid-glitch
    root.classList.remove('tracking')
    void root.offsetWidth
    root.classList.add('tracking')
    window.setTimeout(() => root.classList.remove('tracking'), 500)
  }

  return (
    <nav className="menu">
      <div className="menu-head">--------- MENU ---------</div>
      <ul className="menu-list">
        <li><a href="#projects" onClick={scrollTo('projects')}>CHECK&nbsp;PROJECTS</a></li>
        <li><a href="#about" onClick={scrollTo('about')}>SEE&nbsp;ABOUT</a></li>
        <li><a href="#contact" onClick={scrollTo('contact')}>CONTACT ME</a></li>
        <li><a href="#" onClick={triggerGlitch}>TRACKING</a></li>
      </ul>
      <div className="menu-keys">SELECT : ▲ ▼ KEY &nbsp;&nbsp; SET : ▶ KEY</div>
    </nav>
  )
}
