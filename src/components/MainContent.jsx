import React, { useEffect, useMemo, useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import SectionPage from './SectionPage';

const DESIGN_WIDTH = 744;
const MOBILE_BREAKPOINT = 1023;

function MainContent({ 
  sections, 
  activeSectionId, 
  setActiveSectionId, 
  isAutoScrolling, 
  setIsAutoScrolling,
  rightContainerRef,
  manualScrollRef
}) {
  const [contentScale, setContentScale] = useState(1);
  
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

  useEffect(() => {
    const container = rightContainerRef.current;
    if (!container) return undefined;

    const updateScale = () => {
      const availableWidth = Math.max(1, container.clientWidth - 48);
      setContentScale(availableWidth / DESIGN_WIDTH);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [rightContainerRef]);

  const sectionStyles = useMemo(() => {
    return sections.reduce((acc, section) => {
      const height = `${Math.round(section.designHeight * contentScale)}px`;
      acc[section.id] = {
        height,
        '--section-color': section.color,
      };
      return acc;
    }, {});
  }, [sections, contentScale]);

  const canvasStyle = {
    '--content-scale': contentScale,
  };

  const getFrameStyle = (section) => {
    return {
      width: `${DESIGN_WIDTH}px`,
      height: `${section.designHeight}px`,
      transform: `scale(${contentScale})`,
    };
  };

  return (
    <main
      className="right-container"
      id="content-container"
      ref={rightContainerRef}
      style={canvasStyle}
    >
      {sections.map((section) => (
        <section 
          key={section.id}
          id={section.id} 
          className={`content-section content-section-${section.slug}`}
          style={sectionStyles[section.id]}
        >
          <div
            className="content-scale-frame"
            style={getFrameStyle(section)}
          >
            <SectionPage section={section} />
          </div>
        </section>
      ))}
    </main>
  );
}

export default MainContent;
