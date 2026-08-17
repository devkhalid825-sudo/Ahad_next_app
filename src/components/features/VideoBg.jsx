'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * VideoBg - Optimized hero background video
 *
 * - Poster image is always rendered underneath the video.
 * - Video starts at opacity 0, fades to 1 once canplay fires.
 * - If video fails to load, poster stays fully visible.
 * - Only one controlled play() path (via shouldShow guard + IntersectionObserver).
 * - Does NOT block the global page loader.
 */
const VideoBg = ({
    videoFile,
    videoPoster,
    className = '',
    darken = false,
    overlay = false,
    isActive = false,
    lazy = false,
    onEnded,
    loop = false,
    muted = true,
    preload = 'metadata',
    fetchPriority = 'low',
}) => {
    const videoRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);
    const [videoError, setVideoError] = useState(false);

    const handleCanPlay = useCallback(() => {
        setVideoReady(true);
    }, []);

    const handleError = useCallback(() => {
        setVideoError(true);
        console.warn('VideoBg: video failed to load', videoFile);
    }, [videoFile]);

    const handleEnded = useCallback(() => {
        if (onEnded) onEnded();
    }, [onEnded]);

    const shouldShow = videoReady && !videoError;

    // Single controlled play/pause via useEffect — no double play() calls.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (shouldShow && isActive) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Autoplay prevented — poster stays visible, no action needed.
                });
            }
        } else {
            video.pause();
        }
    }, [shouldShow, isActive]);

    // IntersectionObserver: pause when off-screen, resume when visible.
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        video.pause();
                    } else if (shouldShow && isActive) {
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => { });
                        }
                    }
                });
            },
            { rootMargin: '200px', threshold: 0 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [shouldShow, isActive]);

    return (
        <div className={className}>
            {/* Poster image - always visible, sits underneath the video */}
            {videoPoster && (
                <img
                    src={videoPoster}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        zIndex: shouldShow ? 0 : 1,
                        opacity: shouldShow ? 0 : 1,
                        transition: 'opacity 0.9s ease-in-out',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Video layer - fades in when ready */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    zIndex: shouldShow ? 1 : 0,
                    opacity: shouldShow ? 1 : 0,
                    transition: 'opacity 0.9s ease-in-out',
                    pointerEvents: 'none',
                }}
                src={lazy ? undefined : videoFile}
                poster={undefined}
                autoPlay={isActive}
                loop={loop}
                muted={muted}
                playsInline
                preload={preload}
                fetchPriority={fetchPriority}
                onCanPlay={handleCanPlay}
                onError={handleError}
                onEnded={handleEnded}
            />

            {/* Optional dark overlay */}
            {darken && (
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 2, pointerEvents: 'none' }}
                />
            )}

            {/* Optional top overlay */}
            {overlay && (
                <div
                    className="absolute inset-0"
                    style={{ zIndex: 3, pointerEvents: 'none' }}
                />
            )}
        </div>
    );
};

export default VideoBg;
