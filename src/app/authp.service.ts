// src/app/authp.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthpService {
  private apiUrl = 'https://54.226.193.29:8080/teacher/auth';

  constructor(private http: HttpClient) {}

  login(payload: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, payload, { headers });
  }

  // Método para armazenar o token no localStorage após o login
  storeToken(token: string): void {
    localStorage.setItem('teacherToken', token);
  }

  logout(): void {
    localStorage.removeItem('teacherToken');
  }
}
