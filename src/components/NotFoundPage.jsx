'use client';

import { Link } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

const NotFoundPage = () => {
    return (
    <>
      
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 text-center">
          <span className="text-[150px] md:text-[250px] font-black text-white/5 block leading-none select-none">404</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Page Not Found</h1>
          <p className="text-lg text-white/40 font-light max-w-md">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#4169E1] text-white px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#3158D4] transition-all mt-4"
          >
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NotFoundPage;