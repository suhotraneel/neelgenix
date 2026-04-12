import React, { useState, useRef, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { sectionsData } from './data/sections';
import './index.css';

function App() {
  const [activeSectionId, setActiveSectionId] = useState(sectionsData[0].id);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hideLoader, setHideLoader] = useState(false);
  const rightContainerRef = useRef(null);
  const manualScrollRef = useRef(false);

  // Initial scroll based on URL Slug
  useEffect(() => {
    const path = window.location.pathname;
    const base = import.meta.env.BASE_URL;
    const slug = path.replace(base, '');
    
    if (slug) {
      const targetSection = sectionsData.find(s => s.slug === slug);
      if (targetSection) {
        setActiveSectionId(targetSection.id);
        const el = document.getElementById(targetSection.id);
        if (el) {
          el.scrollIntoView();
        }
      }
    }
  }, []);

  // Sync Title and URL with Active Section
  useEffect(() => {
    if (loading) return;
    const currentSection = sectionsData.find(s => s.id === activeSectionId);
    if (currentSection && !document.hidden) {
      document.title = `Neel Genix - ${currentSection.title}`;
      const base = import.meta.env.BASE_URL;
      window.history.replaceState(null, null, `${base}${currentSection.slug}`);
    }
  }, [activeSectionId, loading]);

  useEffect(() => {
    const altTitles = [
      "🤔 Hello!",
      "✍🏻 I'm Suhotra Chakraborty",
      "🎸 aka Neel Genix",
    ];
    let titleInterval;
    let i = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        titleInterval = setInterval(() => {
          document.title = altTitles[i];
          i = (i + 1) % altTitles.length;
        }, 500);
      } else {
        clearInterval(titleInterval);
        // Restore the current section title
        const currentSection = sectionsData.find(s => s.id === activeSectionId);
        if (currentSection) {
          document.title = `Neel Genix - Suhotra Chakraborty`;
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(titleInterval);
    };
  }, [activeSectionId]);

  useEffect(() => {
    // Faster preloader sequence
    const timer1 = setTimeout(() => {
      setHideLoader(true);
    }, 2000);
    // Unmount after fade finishes (500ms fade)
    const timer2 = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    manualScrollRef.current = true;

    // Force immediate UI update before the scroll starts
    flushSync(() => {
      setActiveSectionId(sectionId);
      setIsAutoScrolling(true);
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    manualScrollRef.current = true;
    const base = import.meta.env.BASE_URL;
    window.history.replaceState(null, null, base);
    
    flushSync(() => {
      setActiveSectionId(sectionsData[0].id);
      setIsAutoScrolling(true);
    });

    const targetSection = document.getElementById(sectionsData[0].id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {loading && (
        <div id="preloader" className={hideLoader ? 'hide' : ''}>
          <span className="loadertext">NEEL GENIX</span>
          <img src="assets/loader.svg" alt="Neel Genix" className="loader" width="64px" height="64px" />
        </div>
      )}
      <div className="app-container">
        <Sidebar 
          sections={sectionsData} 
          activeSectionId={activeSectionId}
          onNavClick={handleNavClick}
          onLogoClick={handleLogoClick}
        />
        <MainContent
          sections={sectionsData}
          activeSectionId={activeSectionId}
          setActiveSectionId={setActiveSectionId}
          isAutoScrolling={isAutoScrolling}
          setIsAutoScrolling={setIsAutoScrolling}
          rightContainerRef={rightContainerRef}
          manualScrollRef={manualScrollRef}
        />
      </div>
    </>
  );
}

export default App;
