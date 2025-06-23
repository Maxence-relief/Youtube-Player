import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { YoutubeTitleService } from './youtube-title.service';

describe('YoutubeTitleService', () => {
  let service: YoutubeTitleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [YoutubeTitleService]
    });
    service = TestBed.inject(YoutubeTitleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});