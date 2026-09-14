'use client';

import Link from 'next/link';
import { FaMapMarkerAlt } from '@/components/ui/Icons';

const IgIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.3a3.9 3.9 0 0 1-.9 1.4c-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.3-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.3.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8zm0 2.2a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zm6.6-3.8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" /></svg>
);
const LiIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M6.9 20H3.6V9.6h3.3V20zM5.2 8.2a2 2 0 1 1 0-3.9 2 2 0 0 1 0 3.9zM20 20h-3.3v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H9.7V9.6h3.2v1.4h.1a3.5 3.5 0 0 1 3.1-1.7c3.3 0 3.9 2.2 3.9 5V20z" /></svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24"><path d="M23 12s0-3.3-.4-4.8a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.4A2.5 2.5 0 0 0 1.4 7.2C1 8.7 1 12 1 12s0 3.3.4 4.8c.2.9.9 1.6 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.4a2.5 2.5 0 0 0 1.8-1.8C23 15.3 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" /></svg>
);

const UsFooter = () => {
  return (
    <footer id="main-footer" className="e-footer">
      <div className="us-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Elipse Studio home">
              <img src="/us-assets/Elipse_Logo.webp" alt="Elipse Studio" className="us-logo" />
            </Link>
            <p className="footer-desc">
              Illinois-based immersive studio — 3D configurators, AR/VR, architectural visualization, animation, and web for US brands since 2014.
            </p>
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>USA Services</h4>
            <ul className="footer-links">
              <li><Link href="/us/services/3d-product-configurators">3D Configurators USA</Link></li>
              <li><Link href="/us/services/virtual-reality-development">VR Development USA</Link></li>
              <li><Link href="/us/services/architectural-visualization">Architectural Vis USA</Link></li>
              <li><Link href="/us/services/3d-animation-services">3D Animation USA</Link></li>
              <li><Link href="/us/services/3d-product-visualization">3D Visualization USA</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>More Services</h4>
            <ul className="footer-links">
              <li><Link href="/us/services/ar-development">AR Development USA</Link></li>
              <li><Link href="/us/services/motion-graphics-services">Motion Graphics USA</Link></li>
              <li><Link href="/us/services/vfx-virtual-production">VFX USA</Link></li>
              <li><Link href="/us/services/virtual-showrooms">Virtual Showrooms USA</Link></li>
              <li><Link href="/us/services/interactive-web-experiences">Interactive Web USA</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>USA Contact <FaMapMarkerAlt className="inline -mt-0.5" /></h4>
            <p className="footer-col-text">1812 McCormick Ln, Hanover Park, IL 60133, United States</p>
            <p className="footer-col-text"><Link href="tel:+16302970428">+1 630-297-0428</Link></p>
            <ul className="footer-links">
              <li><Link href="mailto:info@elipsestudio.com">info@elipsestudio.com</Link></li>
              <li><a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" target="_blank" rel="noopener">Book a Call ↗</a></li>
              <li><Link href="/portfolio">Portfolio ↗</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-middle">
          <span className="social-label">Connect with Elipse Studio</span>
          <div className="footer-social">
            <a href="https://www.instagram.com/elipse_studio/" aria-label="Instagram" target="_blank" rel="noopener"><IgIcon /></a>
            <a href="https://www.linkedin.com/company/elipse-studioo/" aria-label="LinkedIn" target="_blank" rel="noopener"><LiIcon /></a>
            <a href="https://www.youtube.com/@officialelipsestudio" aria-label="YouTube" target="_blank" rel="noopener"><YtIcon /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} Elipse Studio. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link href="/" target="_blank" rel="noopener">elipsestudio.com</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UsFooter;
