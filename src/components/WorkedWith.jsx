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

  // Triplicate the list for seamless infinite loop
  const logos = [...baseLogos, ...baseLogos, ...baseLogos];
  const totalItems = baseLogos.length;
  
  // Start at the first item of the middle set
  const [index, setIndex] = useState(totalItems);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Handle the jump at the end of transition
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

      <div className="ww-carousel-wrapper">
        <div
          className="ww-logo-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
            transform: `translateX(calc(50% - (var(--logo-w) / 2) - (${index} * (var(--logo-w) + var(--grid-gap)))))`
          }}
        >
          {logos.map((logo, i) => {
            const isActive = i === index;
            return (
              <div
                key={`${logo.id}-${i}`}
                className={`ww-logo-card ${isActive ? 'active' : ''}`}
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
