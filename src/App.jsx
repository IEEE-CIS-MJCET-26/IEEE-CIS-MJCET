import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom'
import Loader from './components/Loader'
import Home from './components/Home'
import Navbar from './components/global/Navbar'
import Team from './components/pages/Team'
import Events from './components/pages/Events'
import Contact from './components/pages/Contact'
import Blogs from './components/pages/Blogs'
import BlogDetail from './components/pages/BlogDetail'
import Footer from './components/global/Footer'
import NotFound from './components/NotFound'
import Cursor from './components/Cursor'
import Jeopardy from './components/pages/Jeopardy'


// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

// Standard layout with Navbar + Footer + Cursor
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Cursor />
    </>
  )
}

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      {!loaded && <Cursor onComplete={() => setLoaded(true)} />}
      {loaded && (
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Standalone route — no Navbar / Footer */}
            <Route path="/jeopardy" element={<Jeopardy />} />

            {/* All other routes with standard layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App

