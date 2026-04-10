import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { sectionsData } from './data/sections';
import './index.css';

function App() {
  const [activeSectionId, setActiveSectionId] = useState(sectionsData[0].id);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const rightContainerRef = useRef(null);

  const handleNavClick = (sectionId) => {
    setActiveSectionId(sectionId);
    setIsAutoScrolling(true);
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        sections={sectionsData} 
        activeSectionId={activeSectionId}
        onNavClick={handleNavClick}
      />
      <MainContent 
        sections={sectionsData} 
        activeSectionId={activeSectionId}
        setActiveSectionId={setActiveSectionId}
        isAutoScrolling={isAutoScrolling}
        setIsAutoScrolling={setIsAutoScrolling}
        rightContainerRef={rightContainerRef}
      />
    </div>
  );
}

export default App;
