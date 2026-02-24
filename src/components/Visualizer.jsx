import React from 'react';
import useAudioStore from '../store/useAudioStore';

const Visualizer = () => {
    const { isPlaying, chapters, currentChapter, analyzerData } = useAudioStore();
    const currentChapterData = chapters.find(c => c.id === currentChapter);

    // Number of bars based on our FFT size (we get 32 bins with an fftSize of 64)
    // We will slice off the highest frequencies since human voice doesn't usually hit them
    const renderBins = 24;
    const baseRadius = 80;

    // We draw a circular wave by translating array index into polar coordinates
    const generateBars = () => {
        const bars = [];
        const angleStep = (2 * Math.PI) / renderBins;

        for (let i = 0; i < renderBins; i++) {
            // value is 0-255 from getByteFrequencyData
            const rawVal = analyzerData[i] || 0;
            // Scale and smooth the amplitude
            const amplitude = isPlaying ? (rawVal / 255) * 50 : 0;

            const angle = i * angleStep - Math.PI / 2;

            // Calculate start and end coordinates for the SVG line
            const x1 = 150 + Math.cos(angle) * baseRadius;
            const y1 = 150 + Math.sin(angle) * baseRadius;

            const x2 = 150 + Math.cos(angle) * (baseRadius + amplitude + 4); // +4 min height
            const y2 = 150 + Math.sin(angle) * (baseRadius + amplitude + 4);

            bars.push(
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--accent-color)"
                    strokeWidth={5}
                    strokeLinecap="round"
                    style={{
                        transition: 'all 0.05s ease',
                        opacity: rawVal > 0 ? 0.6 + (rawVal / 255) * 0.4 : 0.3,
                        filter: `drop-shadow(0 0 ${amplitude > 10 ? 8 : 2}px var(--accent-color))`
                    }}
                />
            );
        }
        return bars;
    };

    return (
        <div className="flex-center" style={{ flexDirection: 'column', margin: '2rem 0' }}>

            {/* Realtime Circular SVG Voice Visualizer */}
            <div
                className="flex-center"
                style={{
                    width: '300px',
                    height: '300px',
                    position: 'relative',
                    marginBottom: '1rem',
                }}
            >
                {/* Background soft glow based on bass/volume (first bin) */}
                <div style={{
                    position: 'absolute',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'var(--accent-color)',
                    filter: 'blur(60px)',
                    opacity: isPlaying ? 0.2 + ((analyzerData[1] || 0) / 255) * 0.3 : 0.1,
                    transition: 'opacity 0.1s ease',
                    zIndex: 0
                }} />

                <svg width="300" height="300" style={{ zIndex: 1 }}>
                    {/* Inner static ring */}
                    <circle
                        cx="150"
                        cy="150"
                        r={baseRadius - 10}
                        fill="var(--bg-tertiary)"
                        stroke="rgba(0, 255, 204, 0.1)"
                        strokeWidth="2"
                    />

                    {/* Dynamic Soundwave Bars */}
                    {generateBars()}
                </svg>
            </div>

            <div style={{ textAlign: 'center', marginTop: '0.5rem', height: '90px' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    margin: '0 0 0.5rem 0',
                    fontFamily: 'var(--font-primary)',
                    background: 'linear-gradient(180deg, #fff, rgba(255,255,255,0.6))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: isPlaying ? '0 0 20px rgba(255,255,255,0.1)' : 'none'
                }}>
                    {currentChapterData ? currentChapterData.name_simple : 'Loading...'}
                </h2>
                <p style={{
                    color: 'var(--accent-color)',
                    fontSize: '1.3rem',
                    letterSpacing: '0.1em',
                    opacity: 0.8,
                    fontWeight: 300
                }}>
                    {currentChapterData ? currentChapterData.name_arabic : ''}
                </p>
            </div>
        </div>
    );
};

export default Visualizer;
