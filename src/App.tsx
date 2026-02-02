import { useState } from 'react'
import Hero from './components/Hero'
import Projects from './components/Projects'
import GameSection from './components/GameSection'
import ComponentsShowcase from './components/ComponentsShowcase'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Hero />
      <Projects />
      <GameSection />
      <ComponentsShowcase darkMode={darkMode} setDarkMode={setDarkMode} />
      <Footer />
    </div>
  )
}

export default App