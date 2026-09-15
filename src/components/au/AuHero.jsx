'use client';

import Link from 'next/link';
import { FaCheck } from '@/components/ui/Icons';

const AuHero = ({
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
    <div className="au-hero">
      <div className="au-container">
        <div className="au-hero-grid">
          <div className="au-hero-content">
            {eyebrow && <span className="au-section-eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {lead && <p className="au-hero-lead">{lead}</p>}
            {showActions && (
              <div className="au-hero-actions">
                <Link href={primaryHref} className="au-btn au-btn-primary">{primaryLabel}</Link>
                <a href={secondaryHref} className="au-btn au-btn-outline" target="_blank" rel="noopener noreferrer">{secondaryLabel}</a>
              </div>
            )}
            {stats.length > 0 && (
              <div className="au-hero-stats">
                {stats.map((s, i) => (
                  <div key={i} className="au-hero-stat"><b>{s.number}</b><span>{s.label}</span></div>
                ))}
              </div>
            )}
            {trust.length > 0 && (
              <ul className="au-hero-trust">
                {trust.map((t, i) => (
                  <li key={i}><span className="au-hero-trust-check"><FaCheck /></span> {t}</li>
                ))}
              </ul>
            )}
          </div>
          {visual && <div className="au-hero-visual">{visual}</div>}
        </div>
      </div>
    </div>
  );
};

export default AuHero;
