import React from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import WorkedWith from './WorkedWith';

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

  const renderSectionContent = (section) => {
    switch (section.slug) {
      case 'i-worked-with':
        return <WorkedWith />;
      default:
        return (
          <div style={{ 
            height: '100%', 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            {section.title}
          </div>
        );
    }
  };

  return (
    <main className="right-container" id="content-container" ref={rightContainerRef}>
      {sections.map((section) => (
        <section 
          key={section.id}
          id={section.id} 
          className="placeholder-section" 
          style={{ 
            backgroundColor: section.slug === 'i-worked-with' ? 'transparent' : section.color, 
            height: section.height,
            padding: 0
          }}
        >
          {renderSectionContent(section)}
        </section>
      ))}
    </main>
  );
}

export default MainContent;
