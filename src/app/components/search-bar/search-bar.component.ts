import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() videoPlay = new EventEmitter<{videoId: string}>();
  videoUrl: string = '';
  shake = false;
  slideTopError = false;

  playVideo() {
    const videoId = this.extractVideoId(this.videoUrl);
    if (videoId) {
      this.slideTopError = false;
      this.videoPlay.emit({ videoId });
    } else {
      this.slideTopError = true;
      setTimeout(() => this.slideTopError = false, 500); // durée de l'animation
    }
  }

  private extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }
}