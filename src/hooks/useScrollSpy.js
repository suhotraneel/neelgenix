import { useEffect, useRef } from 'react';

export function useScrollSpy(
  rightContainerRef,
  sections,
  activeSectionId,
  setActiveSectionId,
  isAutoScrolling,
  setIsAutoScrolling,
  manualScrollRef
) {
  // Keep refs up-to-date so scroll handler always reads the latest values
  // without needing to re-register the listener (which was the root cause of the bug)
  const activeSectionIdRef = useRef(activeSectionId);
  const isAutoScrollingRef = useRef(isAutoScrolling);
  const sectionsRef = useRef(sections);

  activeSectionIdRef.current = activeSectionId;
  isAutoScrollingRef.current = isAutoScrolling;
  sectionsRef.current = sections;

  // Update indicator whenever the active section changes
  useEffect(() => {
    const container = rightContainerRef.current;
    if (!container) return;

    const currentSection = document.getElementById(activeSectionId);
    if (!currentSection) return;

    const rect = currentSection.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const threshold = containerRect.top + 24;

    const isMobile = window.innerWidth <= 1024;
    const isLastSection = activeSectionId === sections[sections.length - 1].id;
    let progress = 0;
    if (isLastSection) {
      progress = 0.04;
    } else {
      const totalActiveDistance = rect.height + 24;
      const distanceScrolled = threshold - rect.top;
      progress = distanceScrolled / totalActiveDistance;
    }
    progress = Math.max(0, Math.min(1, progress));

    const indicator = document.getElementById(`indicator-${activeSectionId}`);
    if (indicator) {
      indicator.style.setProperty('--scroll-progress', progress);
    }
  }, [activeSectionId, sections, rightContainerRef]);

  // Register the scroll listener ONCE — reads live values via refs, never re-registers
  useEffect(() => {
    const container = rightContainerRef.current;
    if (!container) return;

    let scrollTimeout;

    const updateIndicatorPosition = () => {
      const activId = activeSectionIdRef.current;
      const secs = sectionsRef.current;
      const currentSection = document.getElementById(activId);
      if (!currentSection) return;

      const rect = currentSection.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const threshold = containerRect.top + 24;

      const isMobile = window.innerWidth <= 1024;
      const isLastSection = activId === secs[secs.length - 1].id;
      let progress = 0;
      if (isLastSection) {
        progress = 0.04;
      } else {
        const totalActiveDistance = rect.height + 24;
        const distanceScrolled = threshold - rect.top;
        progress = distanceScrolled / totalActiveDistance;
      }
      progress = Math.max(0, Math.min(1, progress));

      const indicator = document.getElementById(`indicator-${activId}`);
      if (indicator) {
        indicator.style.setProperty('--scroll-progress', progress);
      }
    };

    const updateActiveSection = () => {
      const secs = sectionsRef.current;
      const activId = activeSectionIdRef.current;
      const containerRect = container.getBoundingClientRect();
      const threshold = containerRect.top + 24;

      let activeCandidate = secs[0].id;
      secs.forEach(section => {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold + 1) {
            activeCandidate = section.id;
          }
        }
      });

      const isAtBottom = Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight;
      if (isAtBottom && secs.length > 0) {
        activeCandidate = secs[secs.length - 1].id;
      }

      if (activeCandidate !== activId) {
        setActiveSectionId(activeCandidate);
      }
    };

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        // Read current values from refs — no stale closures
        if (!manualScrollRef.current && !isAutoScrollingRef.current) {
          updateActiveSection();
        }
        updateIndicatorPosition();
      });

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        manualScrollRef.current = false;
        isAutoScrollingRef.current = false;
        setIsAutoScrolling(false);
        updateIndicatorPosition();
      }, 300);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // Initial paint
    updateActiveSection();
    updateIndicatorPosition();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
    // Empty deps: register once, read live values via refs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
