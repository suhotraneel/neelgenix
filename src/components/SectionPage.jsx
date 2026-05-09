import React from 'react';
import Matter from 'matter-js';
import heroImage from '../assets/hero.png';
import WorkedWith from './WorkedWith';
import storyBg from '../assets/story-bg.png';
import storyHighlight from '../assets/story-highlight.png';
import './SectionPage.css';
import workOnBg from '../assets/work-on-bg.png';
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

const imageForIndex = (index) => (
  <div className="project-thumb" aria-hidden="true">
    <img src={heroImage} alt="" />
    <span>{String(index + 1).padStart(2, '0')}</span>
  </div>
);

function SectionHeader({ section }) {
  return (
    <div className="section-strip">
      <span>{section.number}</span>
      <span>{section.title}</span>
    </div>
  );
}

function HeroSection({ section }) {
  return (
    <div className="hero-panel">
      <div className="hero-copy">
        <p>{section.eyebrow}</p>
        <h1>{section.heading}</h1>
        <div>
          <span>{section.kicker}</span>
          <span>{section.intro}</span>
        </div>
      </div>
      <div className="hero-portrait" aria-hidden="true">
        <img src={heroImage} alt="" />
      </div>
      <p className="hero-footnote">{section.footnote}</p>
    </div>
  );
}

function BridgeSection({ section }) {
  const imgImage22 = '/neelgenix/assets/section2-bridge.png';

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
      <h1>{section.heading}</h1>
      <WorkedWith />
    </div>
  );
}

function ProjectsSection({ section }) {
  return (
    <div className="projects-layout">
      <header className="big-title-block">
        <h1>{section.heading}</h1>
        <p>{section.intro}</p>
      </header>
      <div className="project-list">
        {section.projects.map((project, index) => (
          <article className="project-row" key={project.title}>
            <div className="edge-dots" aria-hidden="true" />
            {imageForIndex(index)}
            <div className="project-copy">
              <h2>{project.title}</h2>
              <p>{project.detail}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <a className="project-action" href={`#${section.id}`} aria-label={`Open ${project.title}`}>
              +
            </a>
            <div className="edge-dots" aria-hidden="true" />
          </article>
        ))}
      </div>
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
        <span className="work-heading-light">all day </span>
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

function AiSection({ section }) {
  return (
    <div className="ai-layout">
      <header className="big-title-block">
        <h1>{section.heading}</h1>
        <p>{section.intro}</p>
      </header>
      <blockquote>{section.quote}</blockquote>
      <div className="ai-card-stack">
        {section.items.map((item, index) => (
          <article className="ai-card" key={item.label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{item.label}</h2>
              <p>{item.detail}</p>
            </div>
            <img src={heroImage} alt="" />
          </article>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection({ section }) {
  return (
    <div className="testimonials-layout">
      <div className="testimonial-carousel">
        {section.items.map((item) => (
          <blockquote key={item.quote}>
            <p>{item.quote}</p>
            <cite>{item.by}</cite>
          </blockquote>
        ))}
      </div>
      <h1>{section.heading}</h1>
    </div>
  );
}

function ContactSection({ section }) {
  const containerRef = React.useRef(null);
  const facesRef = React.useRef([]);
  const [isVisible, setIsVisible] = React.useState(false);
  const engineRef = React.useRef(null);
  const runnerRef = React.useRef(null);
  const bodiesRef = React.useRef([]);
  const mousePos = React.useRef({ x: -1000, y: -1000, active: false });

  React.useEffect(() => {
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    const width = 744;
    const height = 508;
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
        if (body.position.y > floorY - 16) {
            Matter.Body.setPosition(body, { x: body.position.x, y: floorY - 16 });
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

      <div className="contact-bottom-bar" style={{ pointerEvents: 'auto', zIndex: 10, position: 'relative' }}>
        <div className="contact-links-group">
          <a href="/resume.pdf" className="contact-link" download>
            <span className="contact-link-text">Resume</span>
            <div className="contact-link-icon">
              <img src={iconDownload} alt="" />
            </div>
          </a>
          <a href={`mailto:${section.email}`} className="contact-link">
            <span className="contact-link-text">{section.email}</span>
            <div className="contact-link-icon">
              <img src={iconCopy} alt="" />
            </div>
          </a>
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

function SectionPage({ section, scaleStyle }) {
  return (
    <article
      className={`figma-page figma-page-${section.layout} is-${section.tone || 'light'} content-scale-frame`}
      style={{ '--section-color': section.color, ...scaleStyle }}
    >
      <SectionHeader section={section} />
      {renderSection(section)}
    </article>
  );
}

export default SectionPage;
