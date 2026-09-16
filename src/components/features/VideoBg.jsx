'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * VideoBg - Optimized hero background video
 *
 * - Direct src handling for 100% reliable HTML5 playback across Desktop & Mobile.
 * - Explicit JS muted and playsInline for mobile Safari & Chrome autoplay compatibility.
 * - Listens to loadeddata/canplay/play/playing so first frame renders immediately.
 * - Smooth transition with instant response.
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

    const handleReady = useCallback(() => {
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

    // Handle playback and mobile/desktop autoplay requirements
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = true;
        video.defaultMuted = true;

        if (isActive) {
            if (video.readyState >= 2) {
                setVideoReady(true);
            }
            try {
                video.currentTime = 0;
            } catch (e) {}

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => setVideoReady(true))
                    .catch(() => {
                        // Autoplay handled
                    });
            }
        } else {
            video.pause();
        }
    }, [isActive]);

    // IntersectionObserver: pause when off-screen, resume when visible
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        video.pause();
                    } else if (isActive) {
                        video.muted = true;
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                            playPromise.then(() => setVideoReady(true)).catch(() => {});
                        }
                    }
                });
            },
            { rootMargin: '200px', threshold: 0 }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [isActive]);

    return (
        <div className={className}>
            {/* Poster image - always visible underneath until video plays */}
            {videoPoster && (
                <img
                    src={videoPoster}
                    alt=""
                    aria-hidden="true"
                    width="1920"
                    height="1080"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        zIndex: shouldShow ? 0 : 1,
                        opacity: shouldShow ? 0 : 1,
                        transition: 'opacity 0.4s ease-out',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Video layer */}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    zIndex: shouldShow ? 1 : 0,
                    opacity: shouldShow ? 1 : 0,
                    transition: 'opacity 0.4s ease-out',
                    pointerEvents: 'none',
                }}
                src={lazy ? undefined : videoFile}
                autoPlay={isActive}
                loop={loop}
                muted={muted}
                playsInline
                webkit-playsinline="true"
                x5-playsinline="true"
                preload={preload}
                fetchPriority={fetchPriority}
                onLoadedData={handleReady}
                onCanPlay={handleReady}
                onPlay={handleReady}
                onPlaying={handleReady}
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
