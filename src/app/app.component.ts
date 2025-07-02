import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HistoryComponent } from './components/history/history.component';
import i18next from './i18n';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HistoryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['../styles.css']
})
export class AppComponent {
  title = 'youtube-player';
  videoUrl = '';
  embedUrl: SafeResourceUrl | null = null;
  currentVideoTitle = '';
  history: { id: string, title: string, liked?: boolean, disliked?: boolean }[] = [];
  slideTopError = false;
  isHistoryOpen = false;

  lang = i18next.language || 'fr';

  constructor(private sanitizer: DomSanitizer) {}

  t(key: string) {
    return i18next.t(key);
  }

  changeLang(lang: string) {
    i18next.changeLanguage(lang);
    this.lang = lang;
  }

  playVideo() {
    const videoId = this.extractVideoId(this.videoUrl);
    if (videoId) {
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
      const newTitle = `${this.t('VIDEO_TITLE')} ${this.history.length + 1}`;
      this.currentVideoTitle = newTitle;
      if (!this.history.find(v => v.id === videoId)) {
        this.history.push({
          id: videoId,
          title: newTitle,
        });
      }
    } else {
      alert('URL YouTube invalide');
      this.embedUrl = null;
      this.currentVideoTitle = '';
    }
  }

  extractVideoId(url: string): string | null {
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  replayVideo(video: { id: string, title: string }) {
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.id}`);
    this.currentVideoTitle = video.title;
  }

  toggleHistory() {
    this.isHistoryOpen = !this.isHistoryOpen;
  }
}
