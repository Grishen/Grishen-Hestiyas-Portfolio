import { ViewportAtmosphereProvider } from './context/ViewportAtmosphereContext'
import { AnimatedBackdrop } from './components/AnimatedBackdrop'
import { Header } from './components/Header'
import { PortfolioContent } from './components/PortfolioContent'
import { ScrollProgress } from './components/ScrollProgress'

function App() {
  return (
    <ViewportAtmosphereProvider>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div id="top" className="relative min-h-dvh">
        <ScrollProgress />
        <AnimatedBackdrop />
        <Header />
        <PortfolioContent />
      </div>
    </ViewportAtmosphereProvider>
  )
}

export default App
