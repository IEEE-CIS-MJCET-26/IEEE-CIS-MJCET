import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import Home from './components/Home'
import Navbar from './components/global/Navbar'
import Team from './components/pages/Team'
import Events from './components/pages/Events'
import Contact from './components/pages/Contact'
import Footer from './components/global/Footer'
import NotFound from './components/NotFound'
import Cursor from './components/Cursor'


function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {!loaded && <Cursor onComplete={() => setLoaded(true)} />}
      {loaded && (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Cursor />
        </Router>
      )}
    </>
  )
}

export default App
