// src/app/autha.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthaService {
  private apiUrl = 'https://54.226.193.29:8080/admin/auth';

  constructor(private http: HttpClient) {}

  login(payload: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, payload, { headers });
  }

  // Método para armazenar o token no localStorage após o login
  storeToken(token: string): void {
    localStorage.setItem('adminToken', token);
  }

  logout(): void {
    localStorage.removeItem('adminToken');
  }
}
