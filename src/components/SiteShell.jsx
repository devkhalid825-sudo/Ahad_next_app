'use client';

import { useEffect } from 'react';
import { FaWhatsapp } from '@/components/ui/Icons';
import FramerProvider from '@/components/providers/FramerProvider';

export default function SiteShell({ children }) {
  useEffect(() => {
    document.documentElement.classList.add('hydrated');
  }, []);

  return (
    <FramerProvider>
      <div className="font-sans antialiased bg-black min-h-screen">
        <main id="main-content" className="flex flex-col">
          {children}
        </main>
      <a
        href="https://wa.me/923323141556?text=Hi%20Elipse%20Studio%2C%20I%27d%20like%20a%20quick%20inquiry%20about%20your%203D%20services."
        target="_blank"
        rel="noopener noreferrer"
        data-el-track="whatsapp-floating-button"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full pl-3 pr-4 py-2.5 md:py-3 shadow-lg hover:bg-[#1ebe5b] transition-all duration-300 hover:scale-105"
        aria-label="Quick Inquiries — chat on WhatsApp"
      >
        <FaWhatsapp className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-xs md:text-sm font-semibold whitespace-nowrap">Quick Inquiries</span>
      </a>
    </div>
    </FramerProvider>
  );
}
