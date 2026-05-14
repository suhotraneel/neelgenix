import React from 'react';
import { createPortal } from 'react-dom';
import Matter from 'matter-js';
import heroImage from '../assets/hero.png';
import WorkedWith from './WorkedWith';
import storyBg from '../assets/story-bg.png';
import storyHighlight from '../assets/story-highlight.png';
import './SectionPage.css';
import workOnBg from '../assets/work-on-bg.png';
import { sectionsData } from '../data/sections';

// Section 4 Assets
import project1 from '../assets/section4/project1.png';
import project2 from '../assets/section4/project2.png';
import project3 from '../assets/section4/project3.png';
import project4 from '../assets/section4/project4.png';

import iconDownload from '../assets/section10/5db5cda5ca7cd472992d33e00b452c331dbd2cda.svg';
import iconCopy from '../assets/section10/200d8a7094d3571158958e270818b62e6b726654.svg';
import iconLinkedin from '../assets/section10/4c811bea37dc8d79d6ccd1ddcdbbe2c35180cf5f.svg';
import iconInstagram from '../assets/section10/f9346257c2e1ab3f5a6e7245521267b9e3f886ed.svg';

import face0 from '../assets/section10/088a79ff77b70a66e090488e03909c3e13ec0fe7.svg';
import face1 from '../assets/section10/3e7000f7d487a4a460e30948baac836204a5d428.svg';
import face2 from '../assets/section10/405b7bdf11dff603521abd0aa4b6627f4ed0a338.svg';
import face3 from '../assets/section10/461f26cfca8a1bac4138ab148c7ef8396398f273.svg';
import face4 from '../assets/section10/5b5c7d40999d6f2a59efceec95d9cabfa0ff3e16.svg';
import face5 from '../assets/section10/5d50caa59e54ce03cddb7d8cf69a8a61c174fd8d.svg';
import face6 from '../assets/section10/5e409699dc0d7e6b87de2ea5563753982e9757df.svg';
import face7 from '../assets/section10/79cffa88eb75b714e2c5f0fd4f047c7641fb57a3.svg';
import face8 from '../assets/section10/9359cbb1fed464aad3dc48e6c102ee103e12614b.svg';
import face9 from '../assets/section10/9c21e44cd9342a016868a902ddb81116b502397b.svg';
import face10 from '../assets/section10/a2c13ca09be0bf909498406819abbad399fbaea7.svg';
import face11 from '../assets/section10/a57d493a7a654bd1b8cb0a72693b54bb649687a0.svg';
import face12 from '../assets/section10/a7cdcdc3243adac7552a5fbe9d82209c00b68d4e.svg';
import face13 from '../assets/section10/aa4fea55dffcdba72ed30e76f4b89468c8411106.svg';
import face14 from '../assets/section10/ad904d7bea8a67309cbb114e80d353034d2fe165.svg';
import face15 from '../assets/section10/b824532e6f0597c70a26539a647222c401be79f4.svg';
import face16 from '../assets/section10/bea9cb46fb07240bca734a90c0d237928881c9c8.svg';
import face17 from '../assets/section10/cb2fb76c64d5b6558641737cb04beeb14edc9c73.svg';
import face18 from '../assets/section10/e2ffc11fada17aa16f898d59e1721afc5eb69b06.svg';
import face19 from '../assets/section10/fcf40f681d48245222e6e5b4c29bc0b76c14332c.svg';

const facesArray = [face0, face1, face2, face3, face4, face5, face6, face7, face8, face9, face10, face11, face12, face13, face14, face15, face16, face17, face18, face19];

const fallbackCopyTextToClipboard = (text, onSuccess) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
};

const copyTextToClipboard = (text, onSuccess) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(onSuccess)
      .catch(() => fallbackCopyTextToClipboard(text, onSuccess));
  } else {
    fallbackCopyTextToClipboard(text, onSuccess);
  }
};

const imageForIndex = (index) => (
  <div className="project-thumb" aria-hidden="true">
    <img src={heroImage} alt="" />
    <span>{String(index + 1).padStart(2, '0')}</span>
  </div>
);

function SectionHeader({ section }) {
  return (
    <div className="section-strip">
      <span>{section.number}.</span>
      <span>{section.title}</span>
    </div>
  );
}

function HeroSection({ section }) {
  const imgSection1 = `${import.meta.env.BASE_URL}assets/053ba241caf62243a85e37935bfc18cf3f44534b.png`;

  return (
    <div className="hero-panel">
      <div className="hero-bg" aria-hidden="true">
        <img src={imgSection1} alt="" className="hero-bg-img" />
      </div>
      <h1 className="hero-heading">{section.heading}</h1>
      <div className="hero-info-row">
        <div className="hero-info-col left">
          <p className="hero-info-label">{section.kicker}</p>
          <p className="hero-info-value">India</p>
        </div>
        <div className="hero-info-col right">
          <p className="hero-info-label">{section.intro}</p>
          <p className="hero-info-value">AI & Design Systems</p>
        </div>
      </div>
    </div>
  );
}

function BridgeSection({ section }) {
  const imgImage22 = `${import.meta.env.BASE_URL}assets/section2-bridge.png`;

  return (
    <div className="bridge-layout">
      <div className="bridge-center-copy">
        <h1 className="bridge-heading">
          <span className="bridge-heading-light">I bridge </span>
          <span className="bridge-heading-bold">business intent</span>
          <span className="bridge-heading-light"> and </span>
          <span className="bridge-heading-bold">user behaviour</span>
        </h1>
        <div className="bridge-intro">
          <p className="bridge-intro-bold">Shaping products that are clear, usable, and built to scale.</p>
          <p className="bridge-intro-light">From defining what to build to how it evolves, I work with teams to create direction that can be effectively executed.</p>
        </div>
      </div>
      <div className="bridge-skill-row">
        {section.items.map((item) => (
          <article className="bridge-skill-item" key={item.label}>
            <div className="bridge-skill-text">
              <h2>{item.label}</h2>
              <p>{item.detail}</p>
            </div>
            <div className="bridge-skill-image">
              <img src={imgImage22} alt="" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function WorkedWithSection({ section }) {
  return (
    <div className="worked-layout">
      <div className="worked-heading">
        <span className="worked-heading-light">Brands I’ve </span>
        <span className="worked-heading-medium">Worked</span>
        <span className="worked-heading-light"> With</span>
      </div>
      <WorkedWith />
    </div>
  );
}

function StylizedTitle({ className }) {
  const chars = [
    { c: 'T', s: 'gotham-bold' },
    { c: 'H', s: 'handjet-light' },
    { c: 'I', s: 'handjet-black' },
    { c: 'N', s: 'gotham-light' },
    { c: 'G', s: 'handjet-medium' },
    { c: 'S  I’', s: 'handjet-light' },
    { c: 'V', s: 'handjet-medium' },
    { c: 'E', s: 'handjet-light' },
    { c: '  ', s: 'handjet-medium' },
    { c: 'B', s: 'gotham-bold-red' },
    { c: 'U', s: 'handjet-light-red' },
    { c: 'I', s: 'handjet-black-red' },
    { c: 'L', s: 'gotham-light-red' },
    { c: 'T', s: 'handjet-light-red' },
  ];

  return (
    <h1 className={className}>
      {chars.map((item, i) => (
        <span key={i} className={`char-${item.s}`}>
          {item.c}
        </span>
      ))}
    </h1>
  );
}

const getPredominantHue = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const MAX_SIZE = 100;
      let width = img.width;
      let height = img.height;
      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }
      }
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const hueCounts = new Array(360).fill(0);
      let validPixels = 0;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i] / 255;
        let g = data[i + 1] / 255;
        let b = data[i + 2] / 255;
        let a = data[i + 3] / 255;

        if (a < 0.1) continue;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) continue;

        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        if (s < 0.1 || l < 0.1 || l > 0.9) continue;

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h = Math.round(h * 60);
        if (h < 0) h += 360;
        if (h >= 360) h = 0;

        hueCounts[h] += (s * (1 - Math.abs(2 * l - 1)));
        validPixels++;
      }

      if (validPixels === 0) {
        resolve(0);
        return;
      }

      let maxCount = -1;
      let predominantHue = 0;
      for (let i = 0; i < 360; i++) {
        let sum = 0;
        for (let j = -5; j <= 5; j++) {
          let idx = (i + j + 360) % 360;
          sum += hueCounts[idx];
        }
        if (sum > maxCount) {
          maxCount = sum;
          predominantHue = i;
        }
      }

      resolve(predominantHue);
    };
    img.onerror = () => resolve(0);
    img.src = src;
  });
};

function ProjectsSection({ section }) {
  const [activeProject, setActiveProject] = React.useState(null);
  const [isClosing, setIsClosing] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [footerVisible, setFooterVisible] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [projectColors, setProjectColors] = React.useState({});
  const footerRef = React.useRef(null);
  const rowColors = ['#1A161E', '#161E1E', '#1E1616', '#161E16'];
  const projectImages = [project1, project2, project3, project4];

  React.useEffect(() => {
    setImageLoaded(false);
  }, [activeProject]);

  React.useEffect(() => {
    const loadColors = async () => {
      if (!section.projects) return;
      const colors = {};
      for (let i = 0; i < section.projects.length; i++) {
        const project = section.projects[i];
        const src = project.image || projectImages[i % projectImages.length];
        try {
          const hue = await getPredominantHue(src);
          colors[project.title] = `hsl(${hue}, 60%, 10%)`;
        } catch (e) {
          colors[project.title] = rowColors[i % rowColors.length];
        }
      }
      setProjectColors(colors);
    };
    loadColors();
  }, [section.projects]);

  React.useEffect(() => {
    if (!activeProject) {
      setFooterVisible(false);
      setIsScrolled(false);
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.overscrollBehavior = 'auto';
      return;
    }

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    // Give a small delay to ensure ref is attached after portal mount
    const timeoutId = setTimeout(() => {
      if (footerRef.current) {
        observer.observe(footerRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      document.body.style.overflow = 'auto';
      document.body.style.overscrollBehavior = 'auto';
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.overscrollBehavior = 'auto';
    };
  }, [activeProject]);

  const contactSection = sectionsData.find(s => s.layout === 'contact');

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (contactSection?.email) {
      copyTextToClipboard(contactSection.email, () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleProjectClick = (project) => {
    setActiveProject(project);
    setIsClosing(false);
  };

  const closeProjectModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveProject(null);
      setIsClosing(false);
      setIsScrolled(false);
      setFooterVisible(false);
    }, 400); // match transition duration
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = section.projects.findIndex(p => p.title === activeProject.title);
    const prevIndex = (currentIndex - 1 + section.projects.length) % section.projects.length;
    setActiveProject(section.projects[prevIndex]);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = section.projects.findIndex(p => p.title === activeProject.title);
    const nextIndex = (currentIndex + 1) % section.projects.length;
    setActiveProject(section.projects[nextIndex]);
  };

  const handleModalScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10);
  };

  return (
    <div className="projects-layout">
      <header className="big-title-block">
        <StylizedTitle className="project-heading" />
        <p className="project-intro-text">{section.intro}</p>
      </header>
      <div className="project-list">
        {section.projects.map((project, index) => (
          <article
            className="project-row"
            key={project.title}
            style={{ backgroundColor: projectColors[project.title] || rowColors[index % rowColors.length], cursor: 'pointer', transition: 'background-color 0.5s ease' }}
            onClick={() => handleProjectClick(project)}
          >
            <div className="filmstrip-edge" aria-hidden="true">
              {[...Array(20)].map((_, i) => <div key={i} className="film-dot" />)}
            </div>

            <div className="project-main-content">
              <div className="project-thumb-container">
                <img src={project.image || projectImages[index % projectImages.length]} alt="" className="project-thumb-img" />
              </div>

              <div className="project-details">
                <div className="project-details-inner">
                  <div className="project-title-group">
                    <h2 className="project-title-pixel">{project.title}</h2>
                    <p className="project-detail-text">{project.detail}</p>
                  </div>
                  <div className="project-tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="project-arrow-box">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.9999C9 16.9999 9 16.8999 9 16.6999V14.9999H11C11 14.9999 11 15.1013 11 15.3041V16.9999C11 16.9999 10.8986 16.9999 10.6958 16.9999H9ZM11 14.9999C11 14.9999 11 14.8999 11 14.6999V12.9999H13C13 12.9999 13 13.1013 13 13.3041V14.9999C13 14.9999 12.8986 14.9999 12.6958 14.9999H11ZM13 12.9999C13 12.9999 13 12.8999 13 12.6999V10.9999H15C15 10.9999 15 11.1013 15 11.3041V12.9999C15 12.9999 14.8986 12.9999 14.6958 12.9999H13ZM15 10.9999C15 10.9999 15 10.8999 15 10.6999V8.99989H17C17 8.99989 17 9.10127 17 9.30405V10.9999C17 10.9999 16.8986 10.9999 16.6958 10.9999H15ZM13 8.99989C13 8.99989 13 8.89989 13 8.69989V6.99989H15C15 6.99989 15 7.10128 15 7.30405V8.99989C15 8.99989 14.8986 8.99989 14.6958 8.99989H13ZM11 6.99989C11 6.99989 11 6.89989 11 6.69989V4.99989H13C13 4.99989 13 5.10127 13 5.30405V6.99989C13 6.99989 12.8986 6.99989 12.6958 6.99989H11ZM9 4.99989C9 4.99989 9 4.89989 9 4.69989V2.99989H11C11 2.99989 11 3.10128 11 3.30405V4.99989C11 4.99989 10.8986 4.99989 10.6958 4.99989H9Z" fill="white" />
                    <path d="M11 8.99989H13V10.9999L11 10.9999V8.99989Z" fill="white" />
                    <path d="M7 8.99989H9V10.9999H7V8.99989Z" fill="white" />
                    <path d="M3 8.99989H5V10.9999H3V8.99989Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="filmstrip-edge" aria-hidden="true">
              {[...Array(20)].map((_, i) => <div key={i} className="film-dot" />)}
            </div>
          </article>
        ))}
      </div>

      {activeProject && createPortal(
        <div className={`project-modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeProjectModal}>
          <div className="project-modal-bg">
            <div className="project-modal-gradient"></div>
          </div>

          {/* Desktop Nav */}
          <div className="project-modal-nav left desktop-only" onClick={handlePrev}>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.88 1.88L8 0L0 8L8 16L9.88 14.12L3.77333 8L9.88 1.88Z" fill="#ffffff" />
            </svg>
          </div>
          <div className="project-modal-nav right desktop-only" onClick={handleNext}>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.88 0L0 1.88L6.10667 8L0 14.12L1.88 16L9.88 8L1.88 0Z" fill="#ffffff" />
            </svg>
          </div>

          <button className="project-modal-close-fixed desktop-only" onClick={(e) => { e.stopPropagation(); closeProjectModal(); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Mobile Floating Nav - hidden when footer is visible */}
          <div className={`project-modal-nav-mobile left mobile-only ${footerVisible ? 'hidden' : ''}`} onClick={handlePrev}>
            <div className="nav-mobile-bg">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.88 1.88L8 0L0 8L8 16L9.88 14.12L3.77333 8L9.88 1.88Z" fill="#ffffff" />
              </svg>
            </div>
          </div>
          <div className={`project-modal-nav-mobile right mobile-only ${footerVisible ? 'hidden' : ''}`} onClick={handleNext}>
            <div className="nav-mobile-bg">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.88 0L0 1.88L6.10667 8L0 14.12L1.88 16L9.88 8L1.88 0Z" fill="#ffffff" />
              </svg>
            </div>
          </div>

          {copied && (
            <div className="contact-copied-message" style={{ bottom: '80px', zIndex: 100 }}>
              <span>Email ID Copied</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          <div className={`project-modal-content ${isScrolled ? 'is-scrolled' : ''}`} onClick={(e) => e.stopPropagation()} onScroll={handleModalScroll}>
            <div className={`project-modal-header ${isScrolled ? 'has-bg' : ''}`}>
              <div className="project-modal-header-info">
                <h2 className="project-modal-title">
                  <span className="project-modal-number">
                    {(section.projects.findIndex(p => p.id === activeProject.id) + 1).toString().padStart(2, '0')}.&nbsp;
                  </span>
                  {activeProject.title}
                </h2>
                <div className="project-modal-tags">
                  {activeProject.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span className="project-modal-tag">{tag}</span>
                      {idx < activeProject.tags.length - 1 && <span className="project-modal-tag-separator">|</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <button className="project-modal-close mobile-only" onClick={(e) => { e.stopPropagation(); closeProjectModal(); }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="project-modal-body">
              {activeProject.media && activeProject.media.length > 0 ? (
                <div className="project-media-list">
                  {activeProject.media.map((block) => {
                    if (block.type === 'video') {
                      return (
                        <video
                          key={block.id}
                          src={block.url}
                          className="project-modal-full-img"
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: '100%', height: 'auto' }}
                        />
                      );
                    }
                    return (
                      <img
                        key={block.id}
                        src={block.url}
                        alt={activeProject.title}
                        className="project-modal-full-img"
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="project-image-loader" style={{ display: 'flex', justifyContent: 'center', padding: '48px 0', alignItems: 'center' }}>
                  <p style={{ color: '#888' }}>No media available</p>
                </div>
              )}
            </div>

            <div className="project-modal-footer" ref={footerRef}>
              {/* Mobile Footer Chevrons - Left */}
              <div className="footer-chevron left mobile-only" onClick={handlePrev}>
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.88 1.88L8 0L0 8L8 16L9.88 14.12L3.77333 8L9.88 1.88Z" fill="#ffffff" />
                </svg>
              </div>

              <div className="project-modal-footer-content mobile-only">
                <div className="project-modal-footer-row">
                  <a href={contactSection?.items[0]?.href} className="project-modal-link" download>
                    <span className="project-modal-link-text">Resume</span>
                    <img src={iconDownload} alt="" />
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="project-modal-link"
                    style={{ background: 'transparent', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}
                  >
                    <span className="project-modal-link-text">{contactSection?.email || 'suhotraneel@gmail.com'}</span>
                    <img src={iconCopy} alt="" />
                  </button>
                </div>
                <div className="project-modal-footer-row">
                  <a href={contactSection?.items[1]?.href} target="_blank" rel="noreferrer" className="project-modal-link">
                    <span className="project-modal-link-text">Linkedin</span>
                    <img src={iconLinkedin} alt="" />
                  </a>
                  <a href={contactSection?.items[2]?.href} target="_blank" rel="noreferrer" className="project-modal-link">
                    <span className="project-modal-link-text">Instagram</span>
                    <img src={iconInstagram} alt="" />
                  </a>
                </div>
              </div>

              <div className="project-modal-footer-left desktop-only">
                <a href={contactSection?.items[0]?.href} className="project-modal-link" download>
                  <span className="project-modal-link-text">Resume</span>
                  <img src={iconDownload} alt="" />
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="project-modal-link"
                  style={{ background: 'transparent', border: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}
                >
                  <span className="project-modal-link-text">{contactSection?.email || 'suhotraneel@gmail.com'}</span>
                  <img src={iconCopy} alt="" />
                </button>
              </div>

              <div className="project-modal-footer-right desktop-only">
                <a href={contactSection?.items[1]?.href} target="_blank" rel="noreferrer" className="project-modal-link">
                  <span className="project-modal-link-text">Linkedin</span>
                  <img src={iconLinkedin} alt="" />
                </a>
                <a href={contactSection?.items[2]?.href} target="_blank" rel="noreferrer" className="project-modal-link">
                  <span className="project-modal-link-text">Instagram</span>
                  <img src={iconInstagram} alt="" />
                </a>
              </div>

              {/* Mobile Footer Chevrons - Right */}
              <div className="footer-chevron right mobile-only" onClick={handleNext}>
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.88 0L0 1.88L6.10667 8L0 14.12L1.88 16L9.88 8L1.88 0Z" fill="#ffffff" />
                </svg>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function WorkOnSection({ section }) {
  return (
    <div className="work-layout">
      <h1 className="work-heading">
        <span className="work-heading-light">Here’s</span>
        <span className="work-heading-medium"> </span>
        <span className="work-heading-bold">what I work on </span>
        <span className="work-heading-light mobile-break">all day </span>
      </h1>
      <div className="work-card-stack">
        {section.items.map((item, idx) => (
          <article className="work-card" key={idx}>
            <div aria-hidden="true" className="work-card-bg">
              <img src={workOnBg} alt="" className="work-card-bg-img" />
              <div className="work-card-bg-gradient" />
            </div>
            <div className="work-card-content">
              <h2 className="work-card-title">{item.label}</h2>
              <div className="work-card-body">
                <p className="work-card-detail">{item.detail}</p>
                <div className="work-card-meta-list">
                  {item.meta.map((meta, i) => (
                    <span className="work-card-meta-item" key={i}>{meta}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ToolsSection({ section }) {
  return (
    <div className="tools-layout">
      <h1 className="tools-heading">
        <span className="tools-heading-light">Some of the </span>
        <span className="tools-heading-bold">tools</span>
        <span className="tools-heading-light"> I use</span>
      </h1>
      <div className="tool-track">
        {section.items.map((item, index) => (
          <div className={`tool-pentagon-container ${index % 2 ? 'is-low' : ''}`} key={item.name}>
            <div className="tool-pentagon">
              <img src={item.image} alt={item.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StorySection({ section }) {
  return (
    <div className="story-layout">
      <div className="story-media">
        <div className="story-image-track">
          <img src={storyBg} alt="" className="story-bg" />
          <img src={storyBg} alt="" className="story-bg" />
        </div>
        <div className="story-overlay">
          <div className="story-highlight-box">
            <img src={storyHighlight} alt="" className="story-highlight-img" />
          </div>
          <p className="story-overlay-text">{section.pullQuote}</p>
        </div>
      </div>
      <div className="story-copy">
        <p className="story-intro-copy">{section.paragraphs[0]}</p>
        <p className="story-intro-copy">{section.paragraphs[1]}</p>
        <p className="story-main-copy">
          {section.paragraphs[2]}
        </p>
        <div className="story-quote-block">
          <span className="quote-mark">“</span>
          <span className="quote-text">
            <span className="text-red">Stories</span> exist in what is <span className="text-red">built</span> and in what is <span className="text-red">left unsaid</span>.
          </span>
          <span className="quote-mark">”</span>
        </div>
      </div>
    </div>
  );
}

function StylizedAiTitle({ className }) {
  // M A K E   W I T H   A I
  const chars = [
    { c: 'M', s: 'gotham-bold-red' },
    { c: 'A', s: 'handjet-light-red' },
    { c: 'K', s: 'handjet-black-red' },
    { c: 'E', s: 'gotham-light-red' },
    { c: ' ', s: 'handjet-light-black' },
    { c: 'W', s: 'handjet-bold-black' },
    { c: 'I', s: 'handjet-light-black' },
    { c: 'T', s: 'handjet-bold-black' },
    { c: 'H', s: 'handjet-light-black' },
    { c: ' ', s: 'handjet-medium-black' },
    { c: 'A', s: 'gotham-bold-black' },
    { c: 'I', s: 'handjet-light-black' },
  ];

  return (
    <h1 className={className}>
      {chars.map((item, i) => (
        <span key={i} className={`char-${item.s}`}>
          {item.c}
        </span>
      ))}
    </h1>
  );
}

function AiSection({ section }) {
  return (
    <div className="ai-layout">
      <header className="ai-title-block">
        <StylizedAiTitle className="ai-heading" />
        <p className="ai-intro-text">{section.intro}</p>
      </header>
      <div className="ai-quote-container">
        <span className="ai-quote-text">
          <span className="quote-mark">“</span> I <span className="text-bold">iterate rapidly</span> using multiple AI tools, understanding their <span className="text-bold">strengths</span> and <span className="text-bold">limitations</span> to assign the right tasks to the right systems. Some phases benefit from <span className="text-bold">full AI workflows</span>, while others require <span className="text-bold">selective intervention</span>. <span className="quote-mark">”</span>
        </span>
      </div>
      <div className="ai-card-stack">
        {section.items.map((item, index) => (
          <article className="ai-card" key={item.label}>
            <div className="ai-card-text">
              <h2>{item.label}</h2>
              <p dangerouslySetInnerHTML={{ __html: item.detail }}></p>
            </div>
            <img src={heroImage} alt="" className="ai-card-img" />
          </article>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection({ section }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const itemsCount = section.items.length;

  React.useEffect(() => {
    if (isHovered) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemsCount);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [isHovered, itemsCount]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + itemsCount) % itemsCount);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % itemsCount);
  };

  const renderQuote = (quoteStr) => {
    if (!quoteStr) return null;
    const parts = quoteStr.split('\n\n');
    return (
      <div className="testimonial-quote">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <p style={{ marginBottom: 0 }}>{part}</p>
            {i < parts.length - 1 && <p style={{ marginBottom: 0 }}>&#8203;</p>}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="testimonials-layout">
      <div
        className="testimonial-carousel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        {section.items.map((item, index) => {
          let position = 'hidden-right';
          if (index === currentIndex) {
            position = 'active';
          } else if (index === (currentIndex - 1 + itemsCount) % itemsCount) {
            position = 'prev';
          } else if (index === (currentIndex + 1) % itemsCount) {
            position = 'next';
          } else if (index === (currentIndex - 2 + itemsCount) % itemsCount) {
            position = 'hidden-left';
          }

          return (
            <div key={index} className={`testimonial-card-animated ${position}`}>
              {renderQuote(item.quote)}
              <div className="testimonial-author-group">
                <p className="testimonial-author">{item.by}</p>
                <p className="testimonial-role">{item.role}</p>
              </div>
            </div>
          );
        })}

        {/* Chevrons */}
        <div className="testimonial-chevron left" onClick={handlePrev}>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.88 1.88L8 0L0 8L8 16L9.88 14.12L3.77333 8L9.88 1.88Z" fill="#111111" />
          </svg>
        </div>
        <div className="testimonial-chevron right" onClick={handleNext}>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.88 0L0 1.88L6.10667 8L0 14.12L1.88 16L9.88 8L1.88 0Z" fill="#111111" />
          </svg>
        </div>

      </div>

      <p className="testimonials-bg-text">
        <span>What </span>
        <span className="testimonials-bg-text-red">People</span>
        <span> Say</span>
      </p>
    </div>
  );
}

function ContactSection({ section }) {
  const containerRef = React.useRef(null);
  const facesRef = React.useRef([]);
  const [isVisible, setIsVisible] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const engineRef = React.useRef(null);
  const runnerRef = React.useRef(null);
  const bodiesRef = React.useRef([]);
  const mousePos = React.useRef({ x: -1000, y: -1000, active: false });

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (section.email) {
      copyTextToClipboard(section.email, () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  React.useEffect(() => {
    if (!containerRef.current) return;
    const engine = Matter.Engine.create();
    engineRef.current = engine;

    const width = 744;
    const height = containerRef.current.clientHeight;
    const floorY = height - 36;

    const floor = Matter.Bodies.rectangle(width / 2, floorY + 250, width + 1000, 500, { isStatic: true });
    const leftWall = Matter.Bodies.rectangle(-250, height / 2, 500, height * 4, { isStatic: true });
    const rightWall = Matter.Bodies.rectangle(width + 250, height / 2, 500, height * 4, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width / 2, -1000, width + 1000, 500, { isStatic: true });

    Matter.World.add(engine.world, [floor, leftWall, rightWall, ceiling]);

    const faces = [];
    for (let i = 0; i < 60; i++) {
      const x = 100 + Math.random() * 544;
      const y = -Math.random() * 500 - 50;
      const body = Matter.Bodies.polygon(x, y, 5, 18, {
        restitution: 0.5,
        friction: 0.1,
        frictionAir: 0.02,
        label: 'emoji',
      });
      faces.push(body);
    }
    bodiesRef.current = faces;
    Matter.World.add(engine.world, faces);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    const prevMousePos = { x: -1000, y: -1000, active: false };

    Matter.Events.on(engine, 'beforeUpdate', () => {
      const currentHeight = containerRef.current ? containerRef.current.clientHeight : height;
      const dynamicFloorY = currentHeight - 36;

      Matter.Body.setPosition(floor, { x: width / 2, y: dynamicFloorY + 250 });
      Matter.Body.setPosition(leftWall, { x: -250, y: currentHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: width + 250, y: currentHeight / 2 });

      let mvx = 0;
      let mvy = 0;
      let mouseSpeed = 0;
      let mx = 0;
      let my = 0;

      if (mousePos.current.active) {
        mx = mousePos.current.x;
        my = mousePos.current.y;

        if (prevMousePos.active) {
          mvx = mx - prevMousePos.x;
          mvy = my - prevMousePos.y;
        }

        mouseSpeed = Math.sqrt(mvx * mvx + mvy * mvy);
      }

      bodiesRef.current.forEach(body => {
        if (mousePos.current.active) {
          let dx = body.position.x - mx;
          let dy = body.position.y - my;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            if (dist < 1) { dx = 1; dy = 0; dist = 1; }

            // Base repulsion so emojis don't stay near the pointer.
            let forceMagnitude = 0.001 * (180 - dist) / 180;

            // Add extra force based on mouse velocity moving towards the emoji
            if (mouseSpeed > 0) {
              const dirX = dx / dist;
              const dirY = dy / dist;
              const dotProduct = (mvx * dirX) + (mvy * dirY);

              if (dotProduct > 0) {
                forceMagnitude += (dotProduct * 0.0005) * ((180 - dist) / 180);
              }
            }

            Matter.Body.applyForce(body, body.position, {
              x: (dx / dist) * forceMagnitude,
              y: (dy / dist) * forceMagnitude
            });
          }
        }

        const maxVel = 35;
        if (body.velocity.x > maxVel) Matter.Body.setVelocity(body, { x: maxVel, y: body.velocity.y });
        if (body.velocity.x < -maxVel) Matter.Body.setVelocity(body, { x: -maxVel, y: body.velocity.y });
        if (body.velocity.y > maxVel) Matter.Body.setVelocity(body, { x: body.velocity.x, y: maxVel });
        if (body.velocity.y < -maxVel) Matter.Body.setVelocity(body, { x: body.velocity.x, y: -maxVel });

        // Enforce container bounds strictly to prevent clipping and leaving
        if (body.position.y < 16 && body.velocity.y < 0) {
          Matter.Body.setPosition(body, { x: body.position.x, y: 16 });
          Matter.Body.setVelocity(body, { x: body.velocity.x, y: Math.abs(body.velocity.y) * 0.5 });
        }
        if (body.position.x < 16) {
          Matter.Body.setPosition(body, { x: 16, y: body.position.y });
          if (body.velocity.x < 0) Matter.Body.setVelocity(body, { x: Math.abs(body.velocity.x) * 0.5, y: body.velocity.y });
        }
        if (body.position.x > width - 16) {
          Matter.Body.setPosition(body, { x: width - 16, y: body.position.y });
          if (body.velocity.x > 0) Matter.Body.setVelocity(body, { x: -Math.abs(body.velocity.x) * 0.5, y: body.velocity.y });
        }
        if (body.position.y > dynamicFloorY - 16) {
          Matter.Body.setPosition(body, { x: body.position.x, y: dynamicFloorY - 16 });
          if (body.velocity.y > 0) Matter.Body.setVelocity(body, { x: body.velocity.x, y: -Math.abs(body.velocity.y) * 0.5 });
        }
      });

      if (mousePos.current.active) {
        prevMousePos.x = mx;
        prevMousePos.y = my;
        prevMousePos.active = true;
      } else {
        prevMousePos.active = false;
      }
    });

    Matter.Events.on(engine, 'afterUpdate', () => {
      for (let i = 0; i < bodiesRef.current.length; i++) {
        const body = bodiesRef.current[i];
        const el = facesRef.current[i];
        if (el && body) {
          el.style.transform = `translate(${body.position.x - 18}px, ${body.position.y - 18}px) rotate(${body.angle}rad)`;
        }
      }
    });

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (isVisible) {
      bodiesRef.current.forEach(body => {
        const x = 100 + Math.random() * 544;
        const y = -Math.random() * 500 - 50;
        Matter.Body.setPosition(body, { x, y });
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: Math.random() * 5 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
      });
      Matter.Runner.run(runnerRef.current, engineRef.current);
    } else {
      Matter.Runner.stop(runnerRef.current);
      for (let i = 0; i < 60; i++) {
        if (facesRef.current[i]) {
          facesRef.current[i].style.transform = `translate(-1000px, -1000px)`;
        }
      }
    }
  }, [isVisible]);

  const handlePointerMove = (e) => {
    if (!containerRef.current || !engineRef.current) return;
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
      active: true
    };
  };

  const handlePointerLeave = () => {
    mousePos.current.active = false;
  };

  return (
    <div
      className="contact-layout"
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onTouchStart={handlePointerMove}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
      onTouchCancel={handlePointerLeave}
    >
      <div className="contact-faces-container">
        {Array.from({ length: 60 }).map((_, i) => (
          <div className="contact-face-physics" key={i} ref={el => facesRef.current[i] = el}>
            <img src={facesArray[i % 20]} alt="" />
          </div>
        ))}
      </div>

      <div className="contact-content" style={{ pointerEvents: 'none' }}>
        <div className="contact-text-group">
          <p className="contact-intro">{section.intro}</p>
          <p className="contact-detail">
            <span>Let’s work together to </span>
            <span className="bold-red">design</span>
            <span> and </span>
            <span className="bold-red">build</span>
            <span> something impactful, scalable, and ready to grow.</span>
          </p>
        </div>
        <p className="contact-big-text">
          <span className="light">Let’s </span>
          <span className="medium">Build</span>
        </p>
      </div>

      {copied && (
        <div className="contact-copied-message">
          <span>Email ID Copied</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      <div className="contact-bottom-bar" style={{ pointerEvents: 'auto', zIndex: 10, position: 'relative' }}>
        <div className="contact-links-group">
          <a href={section.items[0].href} className="contact-link" download>
            <span className="contact-link-text">{section.items[0].label}</span>
            <div className="contact-link-icon">
              <img src={iconDownload} alt="" />
            </div>
          </a>
          <button
            onClick={handleCopyEmail}
            className="contact-link"
            style={{
              background: 'transparent',
              border: 'none',
              padding: 0,
              margin: 0,
              cursor: 'pointer',
              font: 'inherit',
              color: 'inherit',
              appearance: 'none',
              outline: 'none',
              position: 'relative'
            }}
          >
            <span className="contact-link-text">{section.email}</span>
            <div className="contact-link-icon">
              <img src={iconCopy} alt="" />
            </div>
          </button>
        </div>
        <div className="contact-links-group">
          <a href={section.items[1].href} target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-link-text">{section.items[1].label}</span>
            <div className="contact-link-icon">
              <img src={iconLinkedin} alt="" />
            </div>
          </a>
          <a href={section.items[2].href} target="_blank" rel="noreferrer" className="contact-link">
            <span className="contact-link-text">{section.items[2].label}</span>
            <div className="contact-link-icon">
              <img src={iconInstagram} alt="" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

const renderSection = (section) => {
  switch (section.layout) {
    case 'hero':
      return <HeroSection section={section} />;
    case 'bridge':
      return <BridgeSection section={section} />;
    case 'worked-with':
      return <WorkedWithSection section={section} />;
    case 'projects':
      return <ProjectsSection section={section} />;
    case 'work-on':
      return <WorkOnSection section={section} />;
    case 'tools':
      return <ToolsSection section={section} />;
    case 'story':
      return <StorySection section={section} />;
    case 'ai':
      return <AiSection section={section} />;
    case 'testimonials':
      return <TestimonialsSection section={section} />;
    case 'contact':
      return <ContactSection section={section} />;
    default:
      return null;
  }
};

function SectionPage({ section, scaleStyle, contentScale = 1 }) {
  const articleRef = React.useRef(null);
  const [marginBottom, setMarginBottom] = React.useState(0);

  React.useEffect(() => {
    if (!articleRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const unscaledHeight = entry.target.offsetHeight;
        const scaledHeight = unscaledHeight * contentScale;
        const diff = unscaledHeight - scaledHeight;
        setMarginBottom(-diff);
      }
    });

    resizeObserver.observe(articleRef.current);

    return () => resizeObserver.disconnect();
  }, [contentScale]);

  return (
    <article
      id={section.id}
      ref={articleRef}
      className={`content-section content-section-${section.slug} figma-page figma-page-${section.layout} is-${section.tone || 'light'} content-scale-frame`}
      style={{ '--section-color': section.color, ...scaleStyle, marginBottom: `${marginBottom}px` }}
    >
      <SectionHeader section={section} />
      {renderSection(section)}
    </article>
  );
}

export default SectionPage;
