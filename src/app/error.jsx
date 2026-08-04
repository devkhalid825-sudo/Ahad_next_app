'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Boundary Error caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="text-center space-y-6 max-w-md">
        <h2 className="text-3xl font-bold text-red-500">Something went wrong</h2>
        <p className="text-gray-400 text-sm">
          An error occurred while loading this page. Our team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="bg-[#4169E1] hover:bg-[#3558c8] text-white font-semibold px-6 py-3 rounded-full transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
