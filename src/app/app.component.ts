import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <header>
      <h1>YouTube Player</h1>
      <div class="search-bar">
        <input type="text" placeholder="Rechercher ou coller une URL YouTube..." [(ngModel)]="videoUrl" />
        <button (click)="playVideo()">Lire</button>
      </div>
    </header>

    <main>
      <div class="video-container" *ngIf="embedUrl">
        <iframe
          [src]="embedUrl"
          width="560"
          height="315"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
        </iframe>
        <p class="video-title">{{ currentVideoTitle }}</p>
      </div>

      <div class="history">
        <h2>Historique</h2>
        <p *ngFor="let video of history">{{ video.title }}</p>
      </div>
    </main>
  `,
})
export class AppComponent {
  title = 'youtube-player';  // Ajouté pour le test
  videoUrl = '';
  embedUrl: SafeResourceUrl | null = null;
  currentVideoTitle = '';
  history: { id: string, title: string }[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  playVideo() {
    const videoId = this.extractVideoId(this.videoUrl);
    if (videoId) {
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
      const newTitle = `Vidéo ${this.history.length + 1}`;
      this.currentVideoTitle = newTitle;
      if (!this.history.find(v => v.id === videoId)) {
        this.history.push({ id: videoId, title: newTitle });
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
}
