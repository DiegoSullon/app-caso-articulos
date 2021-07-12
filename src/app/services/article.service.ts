import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private API_URL = `${environment.apiUrl}article`
  constructor(private httpClient: HttpClient) { }

  public getArticles(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_URL}/list`);
  }
  public getArticlesSort(asc:boolean, order:string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_URL}/sort?asc=${asc}&order=${order}`);
  }
}
