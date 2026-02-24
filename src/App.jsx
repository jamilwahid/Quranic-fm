import React, { useEffect, useState } from 'react';
import { User, BookOpen, Sun, Moon } from 'lucide-react';
import useAudioStore from './store/useAudioStore';

import AudioPlayer from './components/AudioPlayer';
import SacredGeometry from './components/SacredGeometry';
import PlayerControls from './components/PlayerControls';
import ChapterDrawer from './components/ChapterDrawer';
import ReciterDrawer from './components/ReciterDrawer';

function App() {
  const { initData, currentChapter, chapters, currentReciter, reciters, theme, toggleTheme } = useAudioStore();
  const [isChapterDrawerOpen, setChapterDrawerOpen] = useState(false);
  const [isReciterDrawerOpen, setReciterDrawerOpen] = useState(false);

  useEffect(() => {
    initData();
  }, [initData]);

  const currentChapterData = chapters.find(c => c.id === currentChapter);
  const currentReciterData = reciters.find(r => r.id === currentReciter);

  return (
    <div className="flex-center" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-primary) 50%, var(--bg-secondary) 100%)',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden' // Important for the overlapping vinyl
    }}>

      {/* Floating Theme Switcher */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          zIndex: 50,
          width: '44px', height: '44px',
          borderRadius: '50%',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          color: 'var(--text-secondary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
        aria-label="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>

      <div style={{
        width: '100%',
        maxWidth: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>

        {/* The centralized, calm geometric mandala */}
        <SacredGeometry />

        {/* Content Area */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

          {/* Title Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingRight: '1rem' }}>
              {/* Unobtrusive, elegant Arabic text */}
              <h1 style={{
                fontSize: '1.4rem',
                fontFamily: 'sans-serif', // Fallback to system arabic fonts
                margin: '0 0 0.2rem 0',
                color: 'var(--text-muted)',
                fontWeight: 300,
                opacity: 0.8
              }}>
                {currentChapterData ? currentChapterData.name_arabic : ''}
              </h1>

              <h2 style={{
                fontSize: '1.8rem',
                fontFamily: 'var(--font-primary)',
                margin: '0 0 0.3rem 0',
                color: 'var(--text-primary)'
              }}>
                {currentChapterData ? currentChapterData.name_simple : 'Loading...'}
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                margin: 0
              }}>
                {currentReciterData ? currentReciterData.reciter_name : '...'}
              </p>
            </div>

            {/* Sub-Actions (Surah / Qari Selection mimicking the Heart & Settings from inspiration) */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button
                onClick={() => setChapterDrawerOpen(true)}
                style={{
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  color: 'var(--text-secondary)'
                }}
                aria-label="Select Surah"
              >
                <BookOpen size={18} />
              </button>
              <button
                onClick={() => setReciterDrawerOpen(true)}
                style={{
                  width: '40px', height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--glass-bg)',
                  color: 'var(--text-secondary)'
                }}
                aria-label="Select Reciter"
              >
                <User size={18} />
              </button>
            </div>
          </div>

          <PlayerControls />
        </div>
      </div>

      <AudioPlayer />

      <ChapterDrawer isOpen={isChapterDrawerOpen} onClose={() => setChapterDrawerOpen(false)} />
      <ReciterDrawer isOpen={isReciterDrawerOpen} onClose={() => setReciterDrawerOpen(false)} />

      {(isChapterDrawerOpen || isReciterDrawerOpen) && (
        <div
          onClick={() => { setChapterDrawerOpen(false); setReciterDrawerOpen(false); }}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--glass-bg-hover)', backdropFilter: 'blur(5px)',
            zIndex: 90, transition: 'var(--transition-fast)'
          }}
        />
      )}
    </div>
  );
}

export default App;
