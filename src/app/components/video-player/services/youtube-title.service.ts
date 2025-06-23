import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TitleResponse {
  title?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class YoutubeTitleService {
  private apiUrl = 'http://localhost:8000/title';

  constructor(private http: HttpClient) {}

  getVideoTitle(youtubeUrl: string): Observable<TitleResponse> {
    const body = { url: youtubeUrl };
    return this.http.post<TitleResponse>(this.apiUrl, body);
  }
}
