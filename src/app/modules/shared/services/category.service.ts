import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// URL
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // Consulta
  getCategories(): Observable<any[]> {
    const endpoint = `${base_url}/categories`;

    return this.http.get<any[]>(endpoint);
  }

  // Guardar categoria
  saveCategorie(body: any): Observable<any> {
    const endpoint = `${base_url}/categories`;

    return this.http.post<any>(endpoint, body);
  }
}
