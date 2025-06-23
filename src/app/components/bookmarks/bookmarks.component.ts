import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent {
  @Input() bookmarks: { id: string, title: string }[] = [];
  @Output() bookmarkSelected = new EventEmitter<{ id: string, title: string }>();

  selectBookmark(bookmark: { id: string, title: string }) {
    this.bookmarkSelected.emit(bookmark);
  }
}