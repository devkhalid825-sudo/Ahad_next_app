'use client';

import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const VideoBg = ({
  videoFile,
  videoFileMp4,
  videoFileOgg,
  videoFileWebm,
  videoPoster,
  darken = false,
  fullScreen = true,
  autoPlay = true,
  loop = true,
  muted = true,
  overlay = false,
  OverlayTopOffset = 0,
  caption = '',
  description = '',
  AriaLabel,
  className = '',
  isActive = true,
  lazy = false,
  onEnded,
  onLoaded,
  preload = 'metadata',
}) => {
  const finalVideoFile = videoFile || videoFileMp4;
  const videoRef = useRef(null);

  const { ref: observerRef, inView: observerInView } = useInView({
    triggerOnce: true,
    rootMargin: '100px',
    skip: !lazy,
  });

  const shouldShow = !lazy || observerInView;

  const handleCanPlay = () => {
    onLoaded?.();
    if (videoRef.current && isActive) {
      videoRef.current.play().catch(err => {
        console.debug('Autoplay prevented by browser:', err);
      });
    }
  };

  const handleLoaded = () => {
    onLoaded?.();
  };

  const handleError = (event) => {
    console.warn('VideoBg loading warning/error:', event);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(err => {
          console.debug('Autoplay prevented:', err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, shouldShow]);

  return (
    <div
      className={`relative w-full ${fullScreen ? 'h-full' : ''} ${
        darken
          ? 'after:content-[""] after:absolute after:inset-0 after:bg-gradient-to-b after:from-black/10 after:via-black/20 after:to-black/90'
          : ''
      } ${className}`}
      ref={lazy ? observerRef : null}
    >
      {overlay && (caption || description) && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-4 z-10"
          style={OverlayTopOffset !== 0 ? { paddingTop: OverlayTopOffset } : {}}
        >
          {caption && (
            <h1 className="text-white text-4xl md:text-8xl font-black uppercase drop-shadow-2xl">
              {caption}
            </h1>
          )}
          {description && (
            <p className="text-white max-w-3xl mx-auto mt-5 drop-shadow-lg">{description}</p>
          )}
        </div>
      )}
      {shouldShow && (
        <video
          ref={videoRef}
          {...(AriaLabel ? { 'aria-label': AriaLabel } : {})}
          autoPlay={autoPlay && isActive}
          loop={loop}
          muted={muted}
          poster={videoPoster}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ease-in-out"
          playsInline
          preload={preload}
          onEnded={onEnded}
          onLoadedData={handleLoaded}
          onCanPlay={handleCanPlay}
          onError={handleError}
        >
          {finalVideoFile && (
            <source
              src={finalVideoFile}
              type={finalVideoFile.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
            />
          )}
          {videoFileWebm && <source src={videoFileWebm} type="video/webm" />}
          {videoFileOgg && <source src={videoFileOgg} type="video/ogg" />}
          Your browser does not support HTML5 background videos.
        </video>
      )}
    </div>
  );
};

export default VideoBg;
