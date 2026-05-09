import React from 'react';
import heroImage from '../assets/hero.png';
import WorkedWith from './WorkedWith';
import './SectionPage.css';

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
  return (
    <div className="bridge-layout">
      <header className="center-copy">
        <h1>{section.heading}</h1>
        <p>{section.intro}</p>
      </header>
      <div className="skill-row">
        {section.items.map((item) => (
          <article className="skill-item" key={item.label}>
            <h2>{item.label}</h2>
            <p>{item.detail}</p>
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
      <h1>{section.heading}</h1>
      <div className="work-card-stack">
        {section.items.map((item) => (
          <article className="work-card" key={item.label}>
            <div>
              <h2>{item.label}</h2>
              <p>{item.detail}</p>
            </div>
            <div className="work-meta">
              {item.meta.map((meta) => (
                <span key={meta}>{meta}</span>
              ))}
            </div>
            <div className="work-orbit" aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  );
}

function ToolsSection({ section }) {
  return (
    <div className="tools-layout">
      <h1>{section.heading}</h1>
      <div className="tool-track">
        {section.items.map((item, index) => (
          <span className={index % 2 ? 'is-low' : ''} key={item}>
            {item.slice(0, 1)}
          </span>
        ))}
      </div>
    </div>
  );
}

function StorySection({ section }) {
  return (
    <div className="story-layout">
      <div className="story-media">
        <div />
        <div />
        <p>{section.pullQuote}</p>
      </div>
      <div className="story-copy">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <blockquote>{section.quote}</blockquote>
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
  return (
    <div className="contact-layout">
      <div className="contact-intro">
        <h2>{section.intro}</h2>
        <p>{section.detail}</p>
      </div>
      <h1>{section.heading}</h1>
      <div className="contact-links">
        <a href={section.items[0].href}>{section.items[0].label}</a>
        <a href={`mailto:${section.email}`}>{section.email}</a>
        {section.items.slice(1).map((item) => (
          <a href={item.href} key={item.label}>{item.label}</a>
        ))}
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

function SectionPage({ section }) {
  return (
    <article
      className={`figma-page figma-page-${section.layout} is-${section.tone || 'light'}`}
      style={{ '--section-color': section.color }}
    >
      <SectionHeader section={section} />
      {renderSection(section)}
    </article>
  );
}

export default SectionPage;
