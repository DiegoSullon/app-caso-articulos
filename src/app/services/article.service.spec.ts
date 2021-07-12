import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import article from '../models/article';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ArticleService]
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
describe('GetArticles', () => {
  let service: ArticleService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ArticleService]
    });
    service = TestBed.inject(ArticleService);
  });
  it('should list',(done: DoneFn)=>{
    service.getArticles().subscribe(data => {
      console.log("DATA:", data);
      expect(data.length).toBeGreaterThan(1);
      done();
    })
  });
  it('should list sort',(done: DoneFn)=>{
    service.getArticlesSort(true,'nombre').subscribe(data => {
      console.log("DATA:", data);
      expect(data.length).toBeGreaterThan(1);
      done();
    })
  });
});

