import React from 'react';
import WorkedWith from './WorkedWith';
import './SectionPage.css';

const renderStats = (stats = []) => (
  <div className="figma-stats">
    {stats.map((stat) => (
      <div className="figma-stat" key={stat.label}>
        <strong>{stat.value}</strong>
        <span>{stat.label}</span>
      </div>
    ))}
  </div>
);

const renderItems = (items = [], className = 'figma-list') => (
  <div className={className}>
    {items.map((item, index) => (
      <div className="figma-list-item" key={item}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <p>{item}</p>
      </div>
    ))}
  </div>
);

function SectionPage({ section }) {
  const isDark = section.slug === 'i-worked-with' || section.slug === 'lets-build';

  return (
    <article className={`figma-page figma-page-${section.layout} ${isDark ? 'is-dark' : ''}`}>
      <div className="figma-section-number">{section.number}</div>
      <header className="figma-copy">
        <p className="figma-kicker">{section.kicker}</p>
        <h1>{section.heading}</h1>
        <p className="figma-intro">{section.intro}</p>
      </header>

      {section.layout === 'intro' && renderStats(section.stats)}

      {section.layout === 'split' && (
        <div className="figma-split-panel">
          {renderItems(section.items)}
        </div>
      )}

      {section.layout === 'worked-with' && (
        <div className="figma-worked-with-panel">
          <WorkedWith />
        </div>
      )}

      {section.layout === 'projects' && (
        <div className="figma-project-grid">
          {section.items.map((item, index) => (
            <div className="figma-project-card" key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{item}</h2>
              <p>Designed as a connected piece of strategy, interface, content, and delivery craft.</p>
            </div>
          ))}
        </div>
      )}

      {section.layout === 'cards' && (
        <div className="figma-card-grid">
          {section.items.map((item) => (
            <div className="figma-focus-card" key={item}>{item}</div>
          ))}
        </div>
      )}

      {section.layout === 'chips' && (
        <div className="figma-chip-cloud">
          {section.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}

      {section.layout === 'quote' && (
        <blockquote className="figma-quote">
          <p>{section.quote}</p>
        </blockquote>
      )}

      {section.layout === 'contact' && (
        <div className="figma-contact-actions">
          {section.items.map((item) => (
            <a href="mailto:hello@neelgenix.com" key={item}>{item}</a>
          ))}
        </div>
      )}
    </article>
  );
}

export default SectionPage;
