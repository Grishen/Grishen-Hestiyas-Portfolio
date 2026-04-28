import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ViewportAtmosphereProvider } from './context/ViewportAtmosphereContext'
import { AnimatedBackdrop } from './components/AnimatedBackdrop'
import { Header } from './components/Header'
import { PortfolioContent } from './components/PortfolioContent'
import { ScrollProgress } from './components/ScrollProgress'
import { AboutMePage } from './pages/AboutMePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SkillsPage } from './pages/SkillsPage'
import { ResumePage } from './pages/ResumePage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <ViewportAtmosphereProvider>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div id="top" className="relative min-h-dvh">
        <ScrollProgress />
        <AnimatedBackdrop />
        <Header />
        <Routes>
          <Route path="/" element={<PortfolioContent />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </div>
    </ViewportAtmosphereProvider>
  )
}

export default App
