import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import useAudioStore from '../store/useAudioStore';

const PlayerControls = () => {
    const {
        isPlaying,
        togglePlayPause,
        playNext,
        playPrevious,
        currentTime,
        duration,
        seekTo
    } = useAudioStore();

    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds) || timeInSeconds === 0) return "0:00";
        const m = Math.floor(timeInSeconds / 60);
        const s = Math.floor(timeInSeconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    const handleSeek = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        seekTo(percentage * duration);
    };

    return (
        <div style={{ width: '100%', marginTop: 'auto' }}>

            {/* Progress Bar Container */}
            <div style={{ marginBottom: '2rem' }}>
                <div
                    onClick={handleSeek}
                    style={{
                        width: '100%',
                        height: '4px',
                        background: 'var(--glass-bg-hover)',
                        borderRadius: 'var(--radius-full)',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                >
                    {/* Active Track */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, bottom: 0,
                        width: `${progressPercent}%`,
                        background: 'var(--text-primary)',
                        borderRadius: 'var(--radius-full)'
                    }} />
                </div>

                {/* Time Labels */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.8rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-primary)'
                }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Main Playback Buttons */}
            <div className="flex-center" style={{ gap: '2rem' }}>
                <button
                    onClick={playPrevious}
                    style={{ color: 'var(--text-primary)', opacity: 0.9 }}
                    aria-label="Previous Chapter"
                >
                    <SkipBack size={24} fill="currentColor" />
                </button>

                {/* The Translucent Play/Pause Button from inspiration */}
                <button
                    className="flex-center"
                    onClick={togglePlayPause}
                    style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-primary)',
                        transition: 'background 0.2s ease',
                    }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <Pause size={28} fill="currentColor" />
                    ) : (
                        <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />
                    )}
                </button>

                <button
                    onClick={playNext}
                    style={{ color: 'var(--text-primary)', opacity: 0.9 }}
                    aria-label="Next Chapter"
                >
                    <SkipForward size={24} fill="currentColor" />
                </button>
            </div>
        </div>
    );
};

export default PlayerControls;
