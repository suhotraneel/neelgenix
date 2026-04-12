import React, { useEffect, useRef } from 'react';

const MIN_NAV_HEIGHT = 60;
const MAX_NAV_HEIGHT = 192;
const MIN_SECTION_HEIGHT = 240;
const MAX_SECTION_HEIGHT = 1000;

function calculateNavHeight(sectionHeight) {
  const clampedHeight = Math.max(MIN_SECTION_HEIGHT, Math.min(sectionHeight, MAX_SECTION_HEIGHT));
  const heightRange = MAX_NAV_HEIGHT - MIN_NAV_HEIGHT;
  const sectionRange = MAX_SECTION_HEIGHT - MIN_SECTION_HEIGHT;
  
  const calculatedHeight = MIN_NAV_HEIGHT + ((clampedHeight - MIN_SECTION_HEIGHT) / sectionRange) * heightRange;
  return Math.round(calculatedHeight);
}

function Sidebar({ sections, activeSectionId, onNavClick }) {
  const menuRef = useRef(null);
  const itemsRef = useRef({});

  // Parse section height from data to calculate nav height without DOM reads
  const getNavHeight = (section) => {
    if (section.id === sections[sections.length - 1].id) return MAX_NAV_HEIGHT;
    
    const hString = section.height || '400px';
    const hValue = parseInt(hString.replace('px', '')) || 400;
    return calculateNavHeight(hValue);
  };

  // Sync scroll positioning of the menu panel when active section changes
  useEffect(() => {
    const activeEl = itemsRef.current[activeSectionId];
    const container = menuRef.current;
    if (!activeEl || !container) return;

    const isMobile = window.innerWidth <= 1023;
    const isLast = activeSectionId === sections[sections.length - 1].id;

    if (isLast) {
      // For the last section, scroll to the extreme end (bottom on desktop, right on mobile)
      const onTransitionEnd = (e) => {
        if (e.propertyName !== (isMobile ? 'width' : 'height')) return;
        if (isMobile) {
          container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
        } else {
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
        activeEl.removeEventListener('transitionend', onTransitionEnd);
      };

      activeEl.addEventListener('transitionend', onTransitionEnd);
      
      // Immediate scroll attempt
      if (isMobile) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      } else {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }

      return () => activeEl.removeEventListener('transitionend', onTransitionEnd);
    } else {
      // For other sections, center the item in the viewport
      activeEl.scrollIntoView({ 
        behavior: 'smooth', 
        block: isMobile ? 'nearest' : 'center', 
        inline: isMobile ? 'center' : 'nearest' 
      });
    }
  }, [activeSectionId, sections]);

  return (
    <nav className="left-panel">
      <div className="logo-container">
        <img src="assets/logo.svg" alt="Neel Genix Logo" className="logo desktop-logo" />
        <img src="assets/ngiconlight.svg" alt="Neel Genix Logo" className="logo mobile-logo" />
      </div>
      <div className="menu-container" ref={menuRef}>
        <div className="menu">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            const targetHeight = getNavHeight(section);

            return (
              <div
                key={section.id}
                role="button"
                tabIndex={0}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={isActive ? { '--dynamic-size': `${targetHeight}px` } : {}}
                ref={(el) => itemsRef.current[section.id] = el}
                onClick={() => onNavClick(section.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onNavClick(section.id);
                }}
              >
                <div className="nav-content">
                  <span className="nav-number">{section.number}</span>
                  <span className="nav-label">{section.title}</span>
                </div>
                <div className="nav-indicator-track">
                  <div className="nav-indicator" id={`indicator-${section.id}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
