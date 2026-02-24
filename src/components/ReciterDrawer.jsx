import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import useAudioStore from '../store/useAudioStore';

const ReciterDrawer = ({ isOpen, onClose }) => {
    const { reciters, currentReciter, setReciter } = useAudioStore();
    const [search, setSearch] = useState('');

    if (!isOpen) return null;

    const filteredReciters = reciters.filter(r =>
        r.reciter_name.toLowerCase().includes(search.toLowerCase())
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
                <h3 style={{ fontSize: '1.5rem' }}>Select Reciter</h3>
                <button onClick={onClose} aria-label="Close"><X size={24} /></button>
            </div>

            <div style={{ padding: '1rem 1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search reciter..."
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
                {filteredReciters.map(reciter => (
                    <button
                        key={reciter.id}
                        onClick={() => { setReciter(reciter.id); onClose(); }}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '0.5rem',
                            background: currentReciter === reciter.id ? 'var(--accent-glow)' : 'transparent',
                            border: currentReciter === reciter.id ? '1px solid var(--accent-color)' : '1px solid transparent',
                            textAlign: 'left'
                        }}
                    >
                        <span style={{ fontSize: '1.1rem', fontWeight: currentReciter === reciter.id ? '600' : '400' }}>
                            {reciter.reciter_name}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReciterDrawer;
