  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable, catchError, throwError, tap } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class GhorarioService {
    private apiUrl = 'https://54.226.193.29:8080/reservation/';
    private teachersUrl = 'https://54.226.193.29:8080/teacher/';
    private subjectsUrl = 'https://54.226.193.29:8080/subject/';
    private timesUrl = 'https://54.226.193.29:8080/time/';
    private roomsUrl = 'https://54.226.193.29:8080/rooms/';
    private coursesUrl = 'https://54.226.193.29:8080/course/';

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('Token de autenticação não encontrado.');
      }
      console.log('Token de autenticação:', token);  // Log para verificação do token
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
    }

    // CRUD para reservas
    createReservation(reservationData: any): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.post(this.apiUrl, reservationData, { headers }).pipe(
        catchError((error) => {
          console.error('Erro ao criar reserva:', error);
          return throwError(() => new Error('Erro ao criar reserva'));
        })
      );
    }

    getReservations(): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
        tap((response) => console.log('Reservas recebidas:', response)),  // Log da resposta
        catchError((error) => {
          console.error('Erro ao obter reservas:', error);
          return throwError(() => new Error('Falha ao obter reservas'));
        })
      );
    }

    updateReservation(reservation: any): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.put<any>(`${this.apiUrl}${reservation.reservationId}`, reservation, { headers }).pipe(
        catchError((error) => {
          console.error('Erro ao atualizar reserva:', error);
          return throwError(() => new Error('Erro ao atualizar reserva'));
        })
      );
    }

    deleteReservation(id: number): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.delete(`${this.apiUrl}${id}`, { headers }).pipe(
        catchError((error) => {
          console.error('Erro ao excluir reserva:', error);
          return throwError(() => new Error('Erro ao excluir reserva'));
        })
      );
    }

    // Métodos adicionais para obter listas dinâmicas
    getTeachers(): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(this.teachersUrl, { headers }).pipe(
        catchError((error) => {
          console.error('Erro ao obter professores:', error);
          return throwError(() => new Error('Erro ao obter professores'));
        })
      );
    }

    getSubjects(): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(this.subjectsUrl, { headers }).pipe(
        catchError((error) => {
          console.error('Erro ao obter matérias:', error);
          return throwError(() => new Error('Erro ao obter matérias'));
        })
      );
    }

    getTimes(): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(this.timesUrl, { headers }).pipe(
        catchError((error) => {
          console.error('Erro ao obter horários:', error);
          return throwError(() => new Error('Erro ao obter horários'));
        })
      );
    }

    getRooms(): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(this.roomsUrl, { headers }).pipe(
        catchError((error) => {
          console.error('Erro ao obter salas:', error);
          return throwError(() => new Error('Erro ao obter salas'));
        })
      );
    }

    getCourses(): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(this.coursesUrl, { headers }).pipe(
        catchError((error) => {
          console.error('Erro ao obter cursos:', error);
          return throwError(() => new Error('Erro ao obter cursos'));
        })
      );
    }
  }
