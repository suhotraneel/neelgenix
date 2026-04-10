import React from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

function MainContent({ 
  sections, 
  activeSectionId, 
  setActiveSectionId, 
  isAutoScrolling, 
  setIsAutoScrolling,
  rightContainerRef 
}) {
  
  // Attach the ported vanilla scroll physics hook
  useScrollSpy(
    rightContainerRef, 
    sections, 
    activeSectionId, 
    setActiveSectionId, 
    isAutoScrolling, 
    setIsAutoScrolling
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
            height: section.height 
          }}
        >
        </section>
      ))}
    </main>
  );
}

export default MainContent;
