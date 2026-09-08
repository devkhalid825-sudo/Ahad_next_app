'use client';

import Link from 'next/link';
import { useUsTheme } from './UsThemeProvider';

const UsNav = ({
  links = [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta = 'Get a Free Estimate',
  ctaHref = '/contact',
  phoneBadge,
}) => {
  const { theme, toggleTheme } = useUsTheme();
  return (
    <header className="us-nav">
      <nav className="us-container us-nav-inner">
        <Link href="/" aria-label="Elipse Studio home">
          <img src="/us-assets/Elipse_Logo.webp" alt="Elipse Studio" className="us-logo" />
        </Link>
        <div className="us-nav-links">
          {phoneBadge && <span className="us-nav-phone">{phoneBadge}</span>}
        </div>
        <div className="us-nav-right">
          <button type="button" className="us-theme-toggle" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9 3.76 0 6.95-2.31 8.25-5.61-.53.11-1.08.18-1.65.18-4.41 0-8-3.59-8-8 0-.57.07-1.12.18-1.65C14.31 3.95 11.76 3 12 3z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" /></svg>
            )}
          </button>
          <Link href={ctaHref} className="us-btn us-btn-primary us-btn-sm">{cta}</Link>
        </div>
      </nav>
    </header>
  );
};

export default UsNav;
