import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HistoryComponent } from './components/history/history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HistoryComponent],  templateUrl: './app.component.html',
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

  constructor(private sanitizer: DomSanitizer) {}

  playVideo() {
  const videoId = this.extractVideoId(this.videoUrl);
  if (videoId) {
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    const newTitle = `Vidéo ${this.history.length + 1}`;
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
