import React from 'react';
import useAudioStore from '../store/useAudioStore';

const HighFidelityVinyl = () => {
    const { isPlaying } = useAudioStore();

    return (
        <div style={{
            position: 'absolute',
            top: '-20%',
            left: '-15%',
            width: '400px',
            height: '400px',
            pointerEvents: 'none',
            zIndex: 0
        }}>

            {/* The Record itself */}
            <div
                className={`vinyl-spin ${isPlaying ? 'is-playing' : ''}`}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'var(--vinyl-base)',
                    boxShadow: '20px 20px 60px rgba(0,0,0,0.5), inset 0 0 10px rgba(0,0,0,0.8)',
                    border: '1px solid #222',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Vinyl Grooves - multiple thick gradients to simulate light catching the grooves */}
                <div style={{
                    position: 'absolute',
                    inset: '10px',
                    borderRadius: '50%',
                    background: 'repeating-radial-gradient(circle, transparent 0px, transparent 4px, rgba(255,255,255,0.01) 5px, rgba(255,255,255,0.01) 6px)',
                    zIndex: 1
                }} />

                <div style={{
                    position: 'absolute',
                    inset: '15%',
                    borderRadius: '50%',
                    background: 'repeating-radial-gradient(circle, transparent 0px, transparent 2px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)',
                    zIndex: 2
                }} />

                {/* Lighting gradient simulating 3D specular shine on the vinyl */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'conic-gradient(from 45deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%, transparent 90%, rgba(255,255,255,0.08) 100%)',
                    zIndex: 3
                }} />

                {/* Center Label Area (Deep blue or geometric pattern) */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1a2a50, #0a1128)', // A very subtle design inside the label
                    boxShadow: '0 0 15px rgba(0,0,0,0.8) inset, 0 0 5px rgba(0,0,0,0.8)',
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    {/* Inner glowing ring on the label */}
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* The spindle hole with a glowing dot like the inspiration image */}
                        <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#d1d1d1', // Metallic spindle connector
                            boxShadow: '0 0 4px rgba(0,0,0,0.8)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#111' // Absolute center hole
                            }} />
                        </div>
                    </div>

                    {/* The glowing dot on the label from the inspiration */}
                    <div style={{
                        position: 'absolute',
                        bottom: '25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        background: 'var(--accent-color)',
                        boxShadow: '0 0 10px var(--accent-glow)'
                    }} />
                </div>
            </div>

            {/* The Tonearm SVG */}
            <div
                className={`tonearm ${isPlaying ? 'is-playing' : ''}`}
                style={{
                    position: 'absolute',
                    top: '60%',
                    right: '-40px',
                    width: '200px',
                    height: '300px',
                    zIndex: 10,
                    // Transform origin adjusted to where the pivot of the SVG is
                    transformOrigin: '160px 40px',
                    filter: 'drop-shadow(-15px 15px 15px rgba(0,0,0,0.5))'
                }}
            >
                <svg viewBox="0 0 200 300" width="100%" height="100%">
                    {/* Pivot Base */}
                    <circle cx="160" cy="40" r="25" fill="#15151a" stroke="#2a2a30" strokeWidth="2" />
                    <circle cx="160" cy="40" r="15" fill="#202025" />
                    <circle cx="160" cy="40" r="6" fill="#0d0d10" />

                    {/* Curved Arm - highly sleek */}
                    <path
                        d="M 160 40 
                           C 100 80, 50 160, 40 220"
                        fill="none"
                        stroke="url(#armGrad)"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />

                    {/* Stylus Headshell */}
                    <g transform="translate(30, 210) rotate(-20)">
                        {/* Metallic connection */}
                        <rect x="0" y="0" width="18" height="25" rx="2" fill="#3a3a40" />
                        {/* The headshell body matching the inspiration */}
                        <rect x="-8" y="25" width="34" height="60" rx="4" fill="#15151a" stroke="#333" strokeWidth="1" />

                        {/* 3 buttons/dots on the headshell */}
                        <circle cx="9" cy="40" r="3" fill="#ff4a4a" /> {/* red dot from inspiration */}
                        <circle cx="9" cy="55" r="3" fill="#333" />
                        <circle cx="9" cy="70" r="3" fill="#333" />

                        {/* Needle point */}
                        <path d="M 5 85 L 13 85 L 9 95 Z" fill="#b0b0b0" />
                    </g>

                    <defs>
                        <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2a2a30" />
                            <stop offset="50%" stopColor="#40404a" />
                            <stop offset="100%" stopColor="#1a1a20" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default HighFidelityVinyl;
