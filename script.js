document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.placeholder-section');
  const navItems = document.querySelectorAll('.nav-item');
  const rightContainer = document.getElementById('content-container');
  const navMenu = document.getElementById('nav-menu');

  // Math for height interpolation
  const MIN_SECTION_HEIGHT = 240;
  const MAX_SECTION_HEIGHT = 1000;
  const MIN_NAV_HEIGHT = 60;
  const MAX_NAV_HEIGHT = 192;

  function calculateNavHeight(sectionHeight) {
    // Clamp the section height between min and max bounds
    const clampedHeight = Math.max(MIN_SECTION_HEIGHT, Math.min(sectionHeight, MAX_SECTION_HEIGHT));

    // Linear interpolation
    const heightRange = MAX_NAV_HEIGHT - MIN_NAV_HEIGHT;
    const sectionRange = MAX_SECTION_HEIGHT - MIN_SECTION_HEIGHT;

    const calculatedHeight = MIN_NAV_HEIGHT + ((clampedHeight - MIN_SECTION_HEIGHT) / sectionRange) * heightRange;
    return Math.round(calculatedHeight);
  }

  // Set up intersection observer to detect which section is in view
  let activeSectionId = null;

  const observerOptions = {
    root: rightContainer,
    rootMargin: '0px',
    threshold: 0.5 // trigger when 50% of the section is visible
  };

  // If a section is very tall (taller than viewport), 0.5 might never be reached. 
  // But our placeholder sections are between 240px and 1000px, so 0.5 is fine for most.
  // Actually, we can use an array of thresholds or just detect the one taking up the most vertical space.

  // A scrollspy approach: activate when a section reaches the top edge of the container
  function updateActiveSection() {
    const containerRect = rightContainer.getBoundingClientRect();
    const threshold = containerRect.top + 24; // 24px scroll margin offset

    let activeCandidate = sections[0]; // fallback to first section

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // If the top of the section has reached or crossed the threshold line
      // (+1px tolerance for subpixel float precision)
      if (rect.top <= threshold + 1) {
        activeCandidate = section;
      }
    });

    // Edge case: if we are absolutely scrolled to the bottom of the container,
    // the last section might not be tall enough to reach the top edge.
    // In that case, we should force the last section to be active.
    const isAtBottom = Math.ceil(rightContainer.scrollTop + rightContainer.clientHeight) >= rightContainer.scrollHeight;
    if (isAtBottom && sections.length > 0) {
      activeCandidate = sections[sections.length - 1];
    }

    if (activeCandidate && activeCandidate.id !== activeSectionId) {
      activeSectionId = activeCandidate.id;
      updateNav(activeSectionId, activeCandidate.offsetHeight);
    }
  }

  function updateNav(sectionId, sectionHeight) {
    const targetHeight = calculateNavHeight(sectionHeight);

    navItems.forEach(item => {
      const isTarget = item.getAttribute('data-target') === sectionId;
      const isLastItem = item === navItems[navItems.length - 1];

      if (isTarget) {
        item.classList.add('active');
        item.style.height = `${targetHeight}px`;

        if (isLastItem) {
          // If it's the last item, we want the container to be at the absolute bottom.
          const container = document.querySelector('.menu-container');
          // We call it immediately and also after a delay to account for the height transition
          const scrollToBottom = () => {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth'
            });
          };
          
          scrollToBottom();
          // The CSS transition is 0.3s, so we check again to ensure we are at the new bottom
          setTimeout(scrollToBottom, 50);
          setTimeout(scrollToBottom, 150);
          setTimeout(scrollToBottom, 300);
        } else {
          item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        item.classList.remove('active');
        item.style.height = ''; // remove inline height
      }
    });
  }

  function updateIndicatorPosition() {
    const activeItem = document.querySelector('.nav-item.active');
    if (!activeItem) return;

    const currentSectionId = activeItem.getAttribute('data-target');
    const currentSection = document.getElementById(currentSectionId);
    if (!currentSection) return;

    const rect = currentSection.getBoundingClientRect();
    const containerRect = rightContainer.getBoundingClientRect();

    const threshold = containerRect.top + 24; // 24px scroll-margin offset
    let progress = 0;

    // Check if this is the absolute last section
    const isLastSection = currentSection === sections[sections.length - 1];

    if (isLastSection) {
      // Calculate true progress relative to the absolute bottom of the container
      const distanceToBottom = rect.bottom - containerRect.bottom;
      const distanceScrolled = threshold - rect.top;
      const totalScrollableForLast = distanceScrolled + distanceToBottom;

      if (totalScrollableForLast > 0) {
        progress = distanceScrolled / totalScrollableForLast;
      } else {
        progress = 1.0; // Automatically fill if the section is too small to scroll
      }
    } else {
      // The section is active exactly from when its top touches the threshold
      // until it scrolls up completely past the threshold (including the 24px gap).
      const totalActiveDistance = rect.height + 24;
      const distanceScrolled = threshold - rect.top;
      progress = distanceScrolled / totalActiveDistance;
    }

    progress = Math.max(0, Math.min(1, progress));

    const indicator = activeItem.querySelector('.nav-indicator');
    if (indicator) {
      indicator.style.top = `${progress * 100}%`;
    }
  }

  let isAutoScrolling = false;
  let scrollTimeout;

  // Listen to scroll events on the right container
  rightContainer.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      if (!isAutoScrolling) {
        updateActiveSection();
      }
      // Always update indicator position during scroll
      updateIndicatorPosition();
    });

    // Detect when scrolling has stopped
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isAutoScrolling = false;
      updateActiveSection();
      updateIndicatorPosition();
    }, 100);
  });

  // Handle click on nav items
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.closest('.nav-item').getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        isAutoScrolling = true;

        // Immediately set this item as active locally
        activeSectionId = targetId;
        updateNav(targetId, targetSection.offsetHeight);
        updateIndicatorPosition();

        // smooth scroll the right container
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initial call to set the first active section
  updateActiveSection();
  updateIndicatorPosition();
});
