'use client';

import React, { useState, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';

/**
 * Extracts YouTube Video ID from various YouTube URL formats.
 */
export const getYouTubeId = (url) => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  return match ? match[1] : null;
};

/**
 * VideoHover Component
 * 
 * Requirements:
 * - Strict 16:9 aspect ratio container (aspect-[16/9])
 * - Load state: WebP poster image (< 150KB optimized, Next.js Image with fill)
 * - Hover state:
 *    - If YouTube URL: embeds muted, looping, autoplaying YouTube player scaled/zoomed 
 *      to completely hide player controls, title, branding and black borders.
 *    - If MP4/WebM URL: silent looping video (muted, loop, playsInline, preload='none').
 *    - If no video: smooth subtle poster zoom (scale-105).
 */
export default function VideoHover({
  posterSrc,
  videoSrc,
  alt = 'Project media',
  className = '',
  children,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const youtubeId = useMemo(() => getYouTubeId(videoSrc), [videoSrc]);
  const isMp4 = useMemo(() => {
    if (!videoSrc || youtubeId) return false;
    return typeof videoSrc === 'string' && (
      videoSrc.includes('.mp4') ||
      videoSrc.includes('.webm') ||
      videoSrc.includes('/media/') ||
      videoSrc.includes('/videos/')
    );
  }, [videoSrc, youtubeId]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (isMp4 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [isMp4]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (isMp4 && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isMp4]);

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Base Poster Image (WebP load state) */}
      {posterSrc ? (
        <Image
          src={posterSrc}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          decoding="async"
          className={`object-cover transition-transform duration-700 pointer-events-none ${
            !videoSrc ? 'group-hover:scale-105' : ''
          }`}
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-900 pointer-events-none" />
      )}

      {/* 2. YouTube Embed Video (Hover Playback fitting 16:9 container perfectly without cutting) */}
      {youtubeId && isHovered && (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-10">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&fs=0&playsinline=1`}
            title={alt}
            className="absolute inset-0 w-full h-full border-0 pointer-events-none select-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
          />
        </div>
      )}

      {/* 3. Silent Looping MP4 Video */}
      {isMp4 && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none z-10 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Optional Card Content / Overlay (e.g. project title, value proposition, link) */}
      {children}
    </div>
  );
}
