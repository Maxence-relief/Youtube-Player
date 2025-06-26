import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Ajoute ceci
import { YoutubeTitleService } from './services/youtube-title.service';

@Component({
  selector: 'app-video-player',
  standalone: true, // si standalone
  imports: [CommonModule], // Ajoute ceci
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  videoUrl: string = '';                      // Lien YouTube entré par l'utilisateur
  videoTitle: string | null = null;           // Titre de la vidéo
  videoDescription: string | null = null;     // Description
  errorMessage: string | null = null;         // Message d'erreur si titre non trouvé

  // Historique simple (sans liked/disliked)
  videoHistory = [
    { title: 'Vidéo 1', liked: false, disliked: false },
    { title: 'Vidéo 2', liked: false, disliked: false },
  ];
  currentVideoIndex = 0;

  constructor(private youtubeTitleService: YoutubeTitleService) {}

  fetchTitle() {
    this.youtubeTitleService.getVideoTitle(this.videoUrl).subscribe(response => {
      if (response.title) {
        this.videoTitle = response.title;
        this.errorMessage = null;

        this.videoHistory.push({
          title: response.title,
          liked: false,
          disliked: false
        });
        this.currentVideoIndex = this.videoHistory.length - 1;
      } else {
        this.errorMessage = response.error ?? 'Erreur inconnue';
        this.videoTitle = null;
      }
    });
  }

  get embedUrl(): string {
    if (!this.videoUrl) return '';
    const videoId = this.extractVideoId(this.videoUrl);
    return `https://www.youtube.com/embed/${videoId}`;
  }

  private extractVideoId(url: string): string {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : '';
  }

  toggleLike(index: number) {
    const video = this.videoHistory[index];
    video.liked = !video.liked;
    if (video.liked) video.disliked = false;
  }

  toggleDislike(index: number) {
    const video = this.videoHistory[index];
    video.disliked = !video.disliked;
    if (video.disliked) video.liked = false;
  }
}
