'use client';

import { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function SiteShell({ children }) {
  useEffect(() => {
    document.documentElement.classList.add('hydrated');
  }, []);

  return (
    <div className="font-sans antialiased bg-black overflow-x-hidden min-h-screen">
      <main className="flex flex-col">
        {children}
      </main>
      <a
        href="https://wa.me/923323141556"
        target="_blank"
        rel="noopener noreferrer"
        data-el-track="whatsapp-floating-button"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#1877F2] text-white rounded-full shadow-lg hover:bg-[#166FE5] transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
}
