import CRTFrame from '@/components/CRTFrame'
import Hero from '@/components/Hero'
import MenuNav from '@/components/MenuNav'
import ProjectsGrid from '@/components/ProjectsGrid'
import About from '@/components/About'
import Contact from '@/components/Contact'

const YEAR = new Date().getFullYear()

export default function Page() {
  return (
    <CRTFrame>
      <main className="content">
        <Hero />
        <MenuNav />
        <ProjectsGrid />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        © {YEAR} // RECORDED ON SP MODE // BE KIND, PLEASE REWIND
      </footer>
    </CRTFrame>
  )
}
