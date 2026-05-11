import React, { useState, useEffect, useRef } from 'react';

const CustomScrollbar = ({ containerRef }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(progress);

      // Show scrollbar on scroll
      setIsVisible(true);

      // Clear existing timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Set timeout to hide scrollbar
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    };

    const handleResize = () => {
      const { scrollHeight, clientHeight } = container;
      const heightPercentage = clientHeight / scrollHeight;
      setThumbHeight(Math.max(heightPercentage * 100, 5)); // Min 5% height
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial setup
    handleResize();
    handleScroll();

    // Use ResizeObserver for content changes
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [containerRef]);

  if (thumbHeight >= 100) return null; // No scrollbar needed

  const thumbTop = scrollProgress * (100 - thumbHeight);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: '2px',
      bottom: 0,
      width: '2px',
      zIndex: 9999,
      pointerEvents: 'none',
      backgroundColor: 'transparent',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out'
    }}>
      <div style={{
        position: 'absolute',
        top: `${thumbTop}%`,
        right: 0,
        width: '2px',
        height: `${thumbHeight}%`,
        backgroundColor: '#7A0000',
      }} />
    </div>
  );
};

export default CustomScrollbar;
