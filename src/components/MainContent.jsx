import React from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

function MainContent({ 
  sections, 
  activeSectionId, 
  setActiveSectionId, 
  isAutoScrolling, 
  setIsAutoScrolling,
  rightContainerRef,
  manualScrollRef
}) {
  
  // Attach the ported vanilla scroll physics hook
  useScrollSpy(
    rightContainerRef, 
    sections, 
    activeSectionId, 
    setActiveSectionId, 
    isAutoScrolling, 
    setIsAutoScrolling,
    manualScrollRef
  );

  return (
    <main className="right-container" id="content-container" ref={rightContainerRef}>
      {sections.map((section) => (
        <section 
          key={section.id}
          id={section.id} 
          className="placeholder-section" 
          style={{ 
            backgroundColor: section.color, 
            height: section.height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}
        >
          {section.title}
        </section>
      ))}
    </main>
  );
}

export default MainContent;
