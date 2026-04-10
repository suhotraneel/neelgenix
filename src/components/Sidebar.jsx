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
    if (!activeEl) return;

    if (activeSectionId === sections[sections.length - 1].id) {
      const container = menuRef.current;
      if (!container) return;

      // Wait for the height expansion animation to finish, THEN scroll to bottom.
      // Using transitionend is exact — no guessing at timeouts.
      const onTransitionEnd = (e) => {
        if (e.propertyName !== 'height') return;
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        activeEl.removeEventListener('transitionend', onTransitionEnd);
      };

      activeEl.addEventListener('transitionend', onTransitionEnd);

      // Fallback: if there's no transition (e.g. prefers-reduced-motion), scroll immediately
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

      return () => activeEl.removeEventListener('transitionend', onTransitionEnd);
    } else {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeSectionId, sections]);

  return (
    <nav className="left-panel">
      <div className="logo-container">
        <img src="assets/logo.svg" alt="Neel Genix Logo" className="logo" />
      </div>
      <div className="menu-container" ref={menuRef}>
        <div className="menu">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            const targetHeight = getNavHeight(section);

            return (
              <a 
                key={section.id}
                href={`#${section.id}`} 
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{ height: isActive ? `${targetHeight}px` : '60px' }}
                ref={(el) => itemsRef.current[section.id] = el}
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(section.id);
                }}
              >
                <div className="nav-content">
                  <span className="nav-number">{section.number}</span>
                  <span className="nav-label">{section.title}</span>
                </div>
                <div className="nav-indicator-track">
                  <div className="nav-indicator" id={`indicator-${section.id}`}></div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
