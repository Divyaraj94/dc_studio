import { useState, useEffect } from 'react';
import Preloader from './components/Preloader/Preloader';
import CursorGlow from './components/CursorGlow/CursorGlow';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  // Force landing on top Hero section upon initial load / refresh
  useEffect(() => {
    window.scrollTo(0, 0);

    // If there is an in-page hash from earlier, clear it so it doesn't jump down
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    window.scrollTo(0, 0);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <div>
      {/* Kinetic Editorial Luxury Preloader (Awwwards / Studio Freight Tier) */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Atmospheric Ambient Glows */}
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <div className="blob blob-3" aria-hidden="true" />

      {/* Reactive Pointer Spotlight */}
      <CursorGlow />

      {/* Fixed Studio Header */}
      <Navbar />

      {/* Curated Architectural Sections */}
      <main>
        {/* 00 / Flagship Personal Hero */}
        <Hero />

        {/* 01 / Selected Works with Rich Visual Mockups & Case Study Drawer */}
        <Projects onShowToast={showToast} />

        {/* 02 / Technical Philosophy */}
        <About />

        {/* 03 / Career Trajectory & Track Record */}
        <Experience />

        {/* 04 / Engineering Capabilities Matrix */}
        <Skills />

        {/* 05 / Initiate Collaboration */}
        <Contact onShowToast={showToast} />
      </main>

      {/* Floating Telemetry Toast Feedback */}
      {toastMessage && (
        <div className="telemetry-toast" role="status" aria-live="polite">
          <span className="telemetry-toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Studio Colophon */}
      <Footer />
    </div>
  );
}
