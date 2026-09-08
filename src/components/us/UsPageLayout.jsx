'use client';

import { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import UsNav from './UsNav';
import UsFooter from './UsFooter';

const UsPageLayout = ({
  nav = {},
  footer = {},
  children,
  noFooter = false,
}) => {
  useEffect(() => {
    const els = document.querySelectorAll('.us-zone .us-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add('us-in-view');
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <UsNav {...nav} />
      <main>{children}</main>
      {!noFooter && <UsFooter {...footer} />}
      <a
        href="https://wa.me/923233141556"
        target="_blank"
        rel="noopener noreferrer"
        className="us-whatsapp-float"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 60,
          width: 56, height: 56, borderRadius: '50%', background: 'var(--us-whatsapp)',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(37,211,102,.35)', transition: 'transform .2s ease',
        }}
      >
        <FaWhatsapp style={{ width: 28, height: 28 }} />
      </a>
    </>
  );
};

export default UsPageLayout;
