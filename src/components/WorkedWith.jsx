import React, { useState, useEffect, useRef } from 'react';
import './WorkedWith.css';

const WorkedWith = () => {
  const baseLogos = [
    { id: 1, name: 'Unilever', file: 'unilever.svg' },
    { id: 2, name: 'Madtrip', file: 'madtrip.svg' },
    { id: 3, name: 'Goa Sunsplash', file: 'goa_sunsplash.svg' },
    { id: 4, name: 'Coschool', file: 'coschool.svg' },
    { id: 5, name: 'Ruskin Bond Collection', file: 'ruskin_bond_collection.svg' },
    { id: 6, name: 'e4f Resurrect', file: 'e4f_ressurect.svg' },
    { id: 7, name: 'Neo Marche', file: 'neo_marche.svg' },
    { id: 8, name: 'Space118', file: 'space118.svg' },
  ];

  // Triplicate the list for seamless infinite loop
  const logos = [...baseLogos, ...baseLogos, ...baseLogos];
  const totalItems = baseLogos.length;

  const [activeIndex, setActiveIndex] = useState(totalItems);
  const wrapperRef = useRef(null);
  const isInteracting = useRef(false);

  // Jump to middle on load
  useEffect(() => {
    if (wrapperRef.current) {
      const cards = wrapperRef.current.querySelectorAll('.ww-logo-card');
      if (cards[totalItems]) {
        cards[totalItems].scrollIntoView({ inline: 'center', block: 'nearest' });
      }
    }
  }, [totalItems]);

  // Track the center item
  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveIndex(parseInt(entry.target.dataset.index, 10));
        }
      });
    }, {
      root: wrapperRef.current,
      rootMargin: '0px -40% 0px -40%', // Only trigger in the middle 20%
      threshold: 0
    });

    const cards = wrapperRef.current.querySelectorAll('.ww-logo-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (isInteracting.current || !wrapperRef.current) return;

      const cards = wrapperRef.current.querySelectorAll('.ww-logo-card');
      const nextIndex = activeIndex + 1;

      if (cards[nextIndex]) {
        cards[nextIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = () => {
    if (!wrapperRef.current) return;

    // Handle the infinite jump smoothly
    if (activeIndex >= totalItems * 2 - 1) {
      // Reached near end, silently jump to middle
      requestAnimationFrame(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.scrollBehavior = 'auto';
          const cards = wrapperRef.current.querySelectorAll('.ww-logo-card');
          const target = activeIndex - totalItems;
          cards[target]?.scrollIntoView({ inline: 'center', block: 'nearest' });
          wrapperRef.current.style.scrollBehavior = 'smooth';
          setActiveIndex(target);
        }
      });
    } else if (activeIndex <= 0) {
      // Reached near start, silently jump to middle
      requestAnimationFrame(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.scrollBehavior = 'auto';
          const cards = wrapperRef.current.querySelectorAll('.ww-logo-card');
          const target = activeIndex + totalItems;
          cards[target]?.scrollIntoView({ inline: 'center', block: 'nearest' });
          wrapperRef.current.style.scrollBehavior = 'smooth';
          setActiveIndex(target);
        }
      });
    }
  };

  const setInteracting = (state) => {
    isInteracting.current = state;
  };

  return (
    <div className="ww-section-container">
      <div className="ww-header">
        <img
          src="/assets/i_worked_with_banner.jpg"
          alt="I Worked With"
          className="ww-banner-img"
        />
      </div>

      <div
        className="ww-carousel-wrapper"
        ref={wrapperRef}
        onScroll={handleScroll}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onTouchStart={() => setInteracting(true)}
        onTouchEnd={() => setInteracting(false)}
        onWheel={() => {
          setInteracting(true);
          clearTimeout(window.wheelTimeout);
          window.wheelTimeout = setTimeout(() => setInteracting(false), 2000);
        }}
      >
        <div className="ww-logo-track">
          {logos.map((logo, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={`${logo.id}-${i}`}
                data-index={i}
                className={`ww-logo-card ${isActive ? 'active' : ''}`}
              >
                {/* Corners */}
                <span className="ww-corner ww-tl" />
                <span className="ww-corner ww-tr" />
                <span className="ww-corner ww-bl" />
                <span className="ww-corner ww-br" />

                <div className="ww-logo-inner">
                  <img
                    src={`/assets/brand_logos/${logo.file}`}
                    alt={logo.name}
                    className="ww-brand-logo"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkedWith;
