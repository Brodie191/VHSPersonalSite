'use client'

export default function Hero() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="hero">
      {/* EDIT kicker + name + role */}
      <div className="kicker">▶ PB PRESENTS // NOW PLAYING</div>
      <h1 className="rgb">
        SALIM<br />
        <span className="accent">BABHAIR</span>
      </h1>
      <p className="sub">
        Programmer &amp; builder. I like breaking <b>hard problems</b> into small
        shippable pieces, and then making them look good.
      </p>
      <a href="#projects" onClick={scrollTo('projects')} className="cta">
        <span>▶</span> PRESS PLAY
      </a>
    </header>
  )
}
