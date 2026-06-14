const BAR_HEIGHTS = [6, 10, 14, 18, 22, 26, 28]

export default function About() {
  return (
    <section id="about">
      <div className="sec-label">// FILE 02</div>
      <div className="sec-title">ABOUT.TXT</div>
      {/* EDIT bio */}
      <p className="about-text">
        I&apos;m a self directed developer and recent CS bachelors graduate working across full-stack web, applied ML, and many domains of cyber security.
        I care about real technical depth, not demos that fall over the second you poke them.
      </p>
      <p className="about-text">
        Currently looking for my first programming role. I learn fast, scope ruthlessly,
        and ship things that work.
      </p>
      <div className="vol-meter">
        VOLUME
        <div className="bars">
          {BAR_HEIGHTS.map((h) => (
            <span key={h} style={{ height: `${h}px` }} />
          ))}
        </div>
      </div>
    </section>
  )
}
