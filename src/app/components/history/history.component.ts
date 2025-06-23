import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="history">
      <h2>Historique</h2>
      <div *ngFor="let video of history"
           (click)="selectVideo(video)"
           class="history-card">
        <div class="history-left">
          <span>{{ video.title }}</span>
        </div>
      </div>
    </aside>
  `,
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  @Input() history: { id: string; title: string; liked?: boolean; disliked?: boolean }[] = [];
  @Output() videoSelected = new EventEmitter<{ id: string; title: string }>();

  selectVideo(video: { id: string; title: string }) {
    this.videoSelected.emit(video);
  }

toggleLike(video: { id: string; title: string; liked?: boolean; disliked?: boolean }) {
  video.liked = !video.liked;
  if (video.liked) video.disliked = false;
}

toggleDislike(video: { id: string; title: string; liked?: boolean; disliked?: boolean }) {
  video.disliked = !video.disliked;
  if (video.disliked) video.liked = false;
}

}
