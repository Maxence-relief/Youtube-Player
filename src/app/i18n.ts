// filepath: c:\Users\game\Desktop\ReliefApplications\Youtube Player\yt-player\src\app\i18n.ts
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: {
          VIDEO_TITLE: 'Video',
          HISTORY: 'History',
          ENTER_URL: 'Enter YouTube URL...'
        }
      },
      fr: {
        translation: {
          VIDEO_TITLE: 'Vidéo',
          HISTORY: 'Historique',
          ENTER_URL: "Entrez l'URL YouTube..."
        }
      }
    },
    fallbackLng: 'fr',
    debug: false,
  });

export default i18next;