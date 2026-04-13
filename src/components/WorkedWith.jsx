import React, { useState, useEffect } from 'react';
import './WorkedWith.css';

const WorkedWith = () => {
  const baseLogos = [
    { id: 1, name: 'Google' },
    { id: 2, name: 'AWS' },
    { id: 3, name: 'Netflix' },
    { id: 4, name: 'Stripe' },
    { id: 5, name: 'OpenAI' },
    { id: 6, name: 'Meta' },
    { id: 7, name: 'Airbnb' },
    { id: 8, name: 'Uber' },
    { id: 9, name: 'Figma' },
  ];

  const logos = [...baseLogos, ...baseLogos, ...baseLogos];
  const totalItems = baseLogos.length;

  const [index, setIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const autoPlayRef = useRef(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 2500);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setIsTransitioning(false);
    stopAutoPlay();
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const currentOffset = clientX - startX;
    setDragOffset(currentOffset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Calculate how many items we dragged (with threshold)
    const cardWidth = window.innerWidth * 0.25; // 25vw
    const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-gap')) || 16;
    const itemFullWidth = cardWidth + gap;
    
    const movedItems = Math.round(-dragOffset / itemFullWidth);
    
    setIndex(prev => prev + movedItems);
    setDragOffset(0);
    setIsTransitioning(true);
    startAutoPlay();
  };

  const handleTransitionEnd = () => {
    if (index >= totalItems * 2) {
      setIsTransitioning(false);
      setIndex(totalItems);
    } else if (index < totalItems) {
      setIsTransitioning(false);
      setIndex(totalItems + (totalItems - 1));
    }
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
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="ww-logo-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            transform: `translateX(calc(50% - (var(--logo-w) / 2) - (${index} * (var(--logo-w) + var(--grid-gap))) + ${dragOffset}px))`
          }}
        >
          {logos.map((logo, i) => {
            const isActive = i === index;
            return (
              <div
                key={`${logo.id}-${i}`}
                className={`ww-logo-card ${isActive ? 'active' : ''}`}
                style={{ userSelect: 'none' }}
              >
                {/* Corners */}
                <span className="ww-corner ww-tl" />
                <span className="ww-corner ww-tr" />
                <span className="ww-corner ww-bl" />
                <span className="ww-corner ww-br" />

                <div className="ww-logo-inner">
                  {/* Future logo image will go here */}
                  <span className="ww-placeholder-text">{logo.name}</span>
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
