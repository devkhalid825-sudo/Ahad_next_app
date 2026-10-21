'use client';

import React from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { FaSun, FaMoon } from '@/components/ui/Icons';

export default function ThemeToggle({ className = '', variant = 'header', isLightMode }) {
  const { theme, isLight, toggleTheme, mounted } = useTheme();

  const effectiveIsLight = isLightMode !== undefined ? isLightMode : isLight;

  if (!mounted) {
    return (
      <div
        className={`site-theme-toggle w-9 h-9 sm:w-10 sm:h-10 rounded-full border opacity-60 ${effectiveIsLight ? 'theme-toggle-light' : 'theme-toggle-dark'
          } ${className}`}
        style={{
          backgroundColor: effectiveIsLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
          borderColor: effectiveIsLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.25)',
        }}
        aria-hidden="true"
      />
    );
  }

  if (variant === 'menu-item') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`site-theme-toggle-item w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-300 ${effectiveIsLight
            ? 'theme-toggle-light text-black border-black/10'
            : 'theme-toggle-dark text-white border-white/10'
          } ${className}`}
        style={{
          backgroundColor: effectiveIsLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.06)',
          borderColor: effectiveIsLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.15)',
          color: effectiveIsLight ? '#000000' : '#ffffff',
        }}
        aria-label={isLight ? 'Day Mode active - Switch to Night mode' : 'Night Mode active - Switch to Day mode'}
      >
        <span className="flex items-center gap-2.5">
          {isLight ? (
            <FaSun className={`w-4 h-4 ${effectiveIsLight ? 'text-black' : 'text-white'}`} />
          ) : (
            <FaMoon className={`w-4 h-4 ${effectiveIsLight ? 'text-black' : 'text-white'}`} />
          )}
          <span>{isLight ? 'Day Mode' : 'Night Mode'}</span>
        </span>
        <span className="text-xs uppercase tracking-wider font-bold opacity-60">
          {isLight ? 'Light Active' : 'Dark Active'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`site-theme-toggle group relative p-2 sm:p-2.5 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer backdrop-blur-md active:scale-90 text-white ${className}`}
      style={{
        backgroundColor: '#121212',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        color: '#ffffff',
      }}
      aria-label={isLight ? 'Day mode active - Switch to Night mode' : 'Night mode active - Switch to Day mode'}
      title={isLight ? 'Switch to Night mode' : 'Switch to Day mode'}
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        {isLight ? (
          <FaSun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" style={{ color: '#ffffff', stroke: '#ffffff' }} />
        ) : (
          <FaMoon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" style={{ color: '#ffffff', fill: '#ffffff' }} />
        )}
      </div>
    </button>
  );
}
