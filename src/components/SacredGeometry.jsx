import React from 'react';
import useAudioStore from '../store/useAudioStore';

const SacredGeometry = () => {
    const { isPlaying } = useAudioStore();

    return (
        <div className="flex-center" style={{
            width: '320px',
            height: '320px',
            position: 'relative',
            margin: '0 auto 3rem auto', // Centered above controls
            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))'
        }}>

            {/* Base aura glow that pulses gently */}
            <div className={`animate-pulse-glow`} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'var(--accent-glow)',
                filter: 'blur(60px)',
                opacity: isPlaying ? 0.8 : 0.3,
                transition: 'opacity 1s ease'
            }} />

            {/* The multi-layered SVG geometric mandala */}
            <svg
                viewBox="0 0 500 500"
                width="100%"
                height="100%"
                style={{ position: 'relative', zIndex: 10 }}
            >
                {/* Layer 1: Outer Slow Ring (Halo + Outer Stars) */}
                <g
                    className={`vinyl-spin ${isPlaying ? 'is-playing' : ''}`}
                    style={{
                        transformOrigin: '250px 250px',
                        animationDuration: '60s' // Extremely slow, meditative rotation
                    }}
                >
                    {/* Thick outer soft halo ring */}
                    <circle cx="250" cy="250" r="210" fill="transparent" stroke="var(--mandala-halo)" strokeWidth="30" />
                    {/* Subtle boundary line for the outer shapes */}
                    <circle cx="250" cy="250" r="195" fill="none" stroke="var(--mandala-lines)" strokeWidth="1" />

                    {/* Outer 8-point star (two intersecting squares) */}
                    {[0, 45].map(angle => (
                        <rect
                            key={`outer-${angle}`}
                            x="112" y="112" width="276" height="276"
                            fill="none"
                            stroke="var(--mandala-lines)"
                            strokeWidth="1"
                            transform={`rotate(${angle} 250 250)`}
                        />
                    ))}
                </g>

                {/* Layer 2: Inner Slow Counter-Clockwise Core */}
                <g
                    className={`vinyl-spin ${isPlaying ? 'is-playing' : ''}`}
                    style={{
                        transformOrigin: '250px 250px',
                        animationDirection: 'reverse',
                        animationDuration: '40s' // Smooth, disparate speed from outer ring
                    }}
                >
                    {/* Solid background covering the middle of the outer lines */}
                    <circle cx="250" cy="250" r="110" fill="var(--mandala-center-bg)" stroke="var(--mandala-lines)" strokeWidth="1" />

                    {/* Single Inner Square */}
                    <rect
                        x="180" y="180" width="140" height="140"
                        fill="none"
                        stroke="var(--mandala-lines)"
                        strokeWidth="1"
                    />

                    {/* Single Inner Diamond */}
                    <rect
                        x="180" y="180" width="140" height="140"
                        fill="none"
                        stroke="var(--mandala-lines)"
                        strokeWidth="1"
                        transform="rotate(45 250 250)"
                    />

                    {/* Small inner square */}
                    <rect
                        x="230" y="230" width="40" height="40"
                        fill="var(--mandala-glow)"
                        stroke="var(--mandala-lines)"
                        strokeWidth="1"
                        transform="rotate(45 250 250)"
                    />

                    {/* Center Point */}
                    <circle cx="250" cy="250" r="5" fill="var(--mandala-center-dot)" />
                </g>
            </svg>
        </div>
    );
};

export default SacredGeometry;
