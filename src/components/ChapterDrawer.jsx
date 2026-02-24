import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import useAudioStore from '../store/useAudioStore';

const ChapterDrawer = ({ isOpen, onClose }) => {
    const { chapters, currentChapter, setChapter } = useAudioStore();
    const [search, setSearch] = useState('');

    if (!isOpen) return null;

    const filteredChapters = chapters.filter(c =>
        c.name_simple.toLowerCase().includes(search.toLowerCase()) ||
        c.name_arabic.includes(search)
    );

    return (
        <div className="glass-panel animate-slide-up" style={{
            position: 'fixed',
            bottom: 0, left: 0, right: 0,
            height: '80vh',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100
        }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem' }}>Select Surah</h3>
                <button onClick={onClose} aria-label="Close"><X size={24} /></button>
            </div>

            <div style={{ padding: '1rem 1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search surah..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem 0.8rem 3rem',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-secondary)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem 1.5rem 1.5rem' }}>
                {filteredChapters.map(chapter => (
                    <button
                        key={chapter.id}
                        onClick={() => { setChapter(chapter.id); onClose(); }}
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '0.5rem',
                            background: currentChapter === chapter.id ? 'var(--accent-glow)' : 'transparent',
                            border: currentChapter === chapter.id ? '1px solid var(--accent-color)' : '1px solid transparent',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ color: 'var(--text-muted)', width: '24px', textAlign: 'center' }}>{chapter.id}</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: currentChapter === chapter.id ? '600' : '400' }}>{chapter.name_simple}</span>
                        </div>
                        <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-primary)' }}>{chapter.name_arabic}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChapterDrawer;
