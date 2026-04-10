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

  // Sync scroll positioning and animation when active section changes
  useEffect(() => {
    Object.keys(itemsRef.current).forEach((id) => {
      const el = itemsRef.current[id];
      if (!el) return;
      
      if (id === activeSectionId) {
        const targetSection = document.getElementById(id);
        const sectionHeight = targetSection ? targetSection.offsetHeight : 0;
        const targetHeight = calculateNavHeight(sectionHeight);
        
        el.style.height = `${targetHeight}px`;

        // Check if last item to force scroll to absolute bottom
        if (id === sections[sections.length - 1].id) {
          const container = menuRef.current;
          if (container) {
            const scrollToBottom = () => {
              container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
              });
            };
            scrollToBottom();
            setTimeout(scrollToBottom, 50);
            setTimeout(scrollToBottom, 150);
            setTimeout(scrollToBottom, 300);
          }
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        el.style.height = ''; 
      }
    });
  }, [activeSectionId, sections]);

  return (
    <nav className="left-panel">
      <div className="logo-container">
        <img src="/assets/logo.svg" alt="Neel Genix Logo" className="logo" />
      </div>
      <div className="menu-container" ref={menuRef}>
        <div className="menu">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <a 
                key={section.id}
                href={`#${section.id}`} 
                className={`nav-item ${isActive ? 'active' : ''}`}
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
                  {/* The top percentage is controlled globally via CSS vars or direct DOM from our hook to avoid rapid re-renders */}
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
