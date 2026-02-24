import React, { useEffect, useRef } from 'react';
import useAudioStore from '../store/useAudioStore';

const AudioPlayer = () => {
    const audioRef = useRef(null);
    const {
        audioUrl,
        isPlaying,
        isLooping,
        playNext,
        setIsPlaying,
        setCurrentTime,
        setDuration,
        seekTarget,
        clearSeekTarget
    } = useAudioStore();

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => {
                    console.error("Playback failed:", e);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, audioUrl, setIsPlaying]);

    useEffect(() => {
        if (audioRef.current && seekTarget !== null) {
            audioRef.current.currentTime = seekTarget;
            clearSeekTarget();
        }
    }, [seekTarget, clearSeekTarget]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    return (
        <audio
            ref={audioRef}
            src={audioUrl || undefined}
            loop={isLooping}
            onEnded={playNext}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            style={{ display: 'none' }}
        />
    );
};

export default AudioPlayer;
