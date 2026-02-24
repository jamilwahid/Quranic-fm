import { create } from 'zustand';
import { fetchChapters, fetchReciters, fetchAudioUrl } from '../services/api';

const useAudioStore = create((set, get) => ({
    chapters: [],
    reciters: [],

    currentChapter: 1,
    // 7 is globally understood as Mishary Rashid Alafasy in quran.com v4
    currentReciter: 7,

    isPlaying: false,
    isLooping: false,

    audioUrl: null,
    isLoadingAudio: false,

    // Theme Management
    theme: 'light',
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        return { theme: newTheme };
    }),

    // Audio Progress Tracking
    currentTime: 0,
    duration: 0,
    setCurrentTime: (time) => set({ currentTime: time }),
    setDuration: (duration) => set({ duration: duration }),
    seekTo: (time) => {
        // We will pass this down to the Audio component to actually perform the seek
        // by storing a 'seekTarget' that the audio component watches
        set({ seekTarget: time });
    },
    seekTarget: null,
    clearSeekTarget: () => set({ seekTarget: null }),

    // Initialize app data
    initData: async () => {
        const [chaptersData, recitersData] = await Promise.all([
            fetchChapters(),
            fetchReciters()
        ]);

        set({ chapters: chaptersData, reciters: recitersData });
        get().loadAudio(get().currentReciter, get().currentChapter);
    },

    loadAudio: async (reciterId, chapterId) => {
        set({ isLoadingAudio: true });
        const url = await fetchAudioUrl(reciterId, chapterId);

        // Some audio URLs from quran.com don't have https appended
        const formattedUrl = url && url.startsWith('//') ? `https:${url}` : url;

        set({
            audioUrl: formattedUrl,
            currentChapter: chapterId,
            currentReciter: reciterId,
            isLoadingAudio: false,
            currentTime: 0, // Reset progress on load
        });
    },

    setChapter: (chapterId) => {
        if (chapterId === get().currentChapter) return;
        get().loadAudio(get().currentReciter, chapterId);
        set({ isPlaying: true }); // auto play on change
    },

    setReciter: (reciterId) => {
        if (reciterId === get().currentReciter) return;
        get().loadAudio(reciterId, get().currentChapter);
        set({ isPlaying: true }); // auto play on change
    },

    togglePlayPause: () => {
        set((state) => ({ isPlaying: !state.isPlaying }));
    },

    setIsPlaying: (playing) => {
        set({ isPlaying: playing });
    },

    toggleLoop: () => {
        set((state) => ({ isLooping: !state.isLooping }));
    },

    playNext: () => {
        const current = get().currentChapter;
        if (current < 114) {
            get().setChapter(current + 1);
        } else {
            get().setChapter(1); // loop back to Al-Fatihah
        }
    },

    playPrevious: () => {
        const current = get().currentChapter;
        if (current > 1) {
            get().setChapter(current - 1);
        } else {
            get().setChapter(114);
        }
    }
}));

export default useAudioStore;
