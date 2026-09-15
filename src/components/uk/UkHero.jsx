'use client';

import Link from 'next/link';
import { FaCheck } from '@/components/ui/Icons';

const UkHero = ({
  eyebrow,
  title,
  lead,
  actions = true,
  stats = [],
  trust = [],
  visual,
  primaryHref = '/contact',
  primaryLabel = 'Book Project Consultation',
  secondaryLabel = 'Schedule a Call',
  secondaryHref = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting',
}) => {
  const showActions = Array.isArray(actions) ? actions.length > 0 : Boolean(actions);

  return (
    <div className="uk-hero">
      <div className="uk-container">
        <div className="uk-hero-grid">
          <div className="uk-hero-content">
            {eyebrow && <span className="uk-section-eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {lead && <p className="uk-hero-lead">{lead}</p>}
            {showActions && (
              <div className="uk-hero-actions">
                <Link href={primaryHref} className="uk-btn uk-btn-primary">{primaryLabel}</Link>
                <a href={secondaryHref} className="uk-btn uk-btn-outline" target="_blank" rel="noopener noreferrer">{secondaryLabel}</a>
              </div>
            )}
            {stats.length > 0 && (
              <div className="uk-hero-stats">
                {stats.map((s, i) => (
                  <div key={i} className="uk-hero-stat"><b>{s.number}</b><span>{s.label}</span></div>
                ))}
              </div>
            )}
            {trust.length > 0 && (
              <ul className="uk-hero-trust">
                {trust.map((t, i) => (
                  <li key={i}><span className="uk-hero-trust-check"><FaCheck /></span> {t}</li>
                ))}
              </ul>
            )}
          </div>
          {visual && <div className="uk-hero-visual">{visual}</div>}
        </div>
      </div>
    </div>
  );
};

export default UkHero;
