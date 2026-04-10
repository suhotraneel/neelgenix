import { useEffect } from 'react';

export function useScrollSpy(rightContainerRef, sections, activeSectionId, setActiveSectionId, isAutoScrolling, setIsAutoScrolling) {
  useEffect(() => {
    const container = rightContainerRef.current;
    if (!container) return;

    let scrollTimeout;

    const updateIndicatorPosition = () => {
      const activeItem = document.querySelector('.nav-item.active');
      if (!activeItem) return;

      const currentSection = document.getElementById(activeSectionId);
      if (!currentSection) return;

      const rect = currentSection.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const threshold = containerRect.top + 24; // 24px scroll-margin offset
      
      let progress = 0;
      
      // Check if this is the absolute last section
      const isLastSection = activeSectionId === sections[sections.length - 1].id;

      if (isLastSection) {
        progress = 0.5;
      } else {
        const totalActiveDistance = rect.height + 24;
        const distanceScrolled = threshold - rect.top;
        progress = distanceScrolled / totalActiveDistance;
      }

      progress = Math.max(0, Math.min(1, progress));

      const indicator = document.getElementById(`indicator-${activeSectionId}`);
      if (indicator) {
        indicator.style.top = `${progress * 100}%`;
      }
    };

    const updateActiveSection = () => {
      const containerRect = container.getBoundingClientRect();
      const threshold = containerRect.top + 24;
      
      let activeCandidate = sections[0].id; // id fallback

      sections.forEach(section => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold + 1) {
            activeCandidate = section.id;
          }
        }
      });

      const isAtBottom = Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight;
      if (isAtBottom && sections.length > 0) {
        activeCandidate = sections[sections.length - 1].id;
      }

      if (activeCandidate !== activeSectionId) {
        setActiveSectionId(activeCandidate);
      }
    };

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        if (!isAutoScrolling) {
          updateActiveSection();
        }
        updateIndicatorPosition();
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsAutoScrolling(false);
        if (!isAutoScrolling) updateActiveSection();
        updateIndicatorPosition();
      }, 100);
    };

    container.addEventListener('scroll', handleScroll);
    
    // Initial paint
    updateActiveSection();
    updateIndicatorPosition();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [sections, activeSectionId, isAutoScrolling, setActiveSectionId, setIsAutoScrolling]);
}
