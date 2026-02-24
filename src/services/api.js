const BASE_URL = 'https://api.quran.com/api/v4';

// Fetches the list of all 114 Surahs
export const fetchChapters = async () => {
    try {
        const response = await fetch(`${BASE_URL}/chapters`);
        const data = await response.json();
        return data.chapters;
    } catch (error) {
        console.error('Error fetching chapters:', error);
        return [];
    }
};

// Fetches the list of available audio recitors
export const fetchReciters = async () => {
    try {
        const response = await fetch(`${BASE_URL}/resources/recitations`);
        const data = await response.json();
        return data.recitations;
    } catch (error) {
        console.error('Error fetching reciters:', error);
        return [];
    }
};

// Fetches the audio file URL for a specific chapter and reciter
export const fetchAudioUrl = async (reciterId, chapterId) => {
    try {
        const response = await fetch(`${BASE_URL}/chapter_recitations/${reciterId}/${chapterId}`);
        const data = await response.json();
        return data.audio_file.audio_url;
    } catch (error) {
        console.error('Error fetching audio URL:', error);
        return null;
    }
};
