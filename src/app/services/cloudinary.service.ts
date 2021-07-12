import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private API_URL = `${environment.apiUrl}cloudinary` ;
  constructor(
    private httpClient: HttpClient,
  ) {}

  public uploadImage(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', imagen);

    return this.httpClient.post<any>(
      `${this.API_URL}/upload`,
      formData,
    );
  }
}
