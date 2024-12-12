import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private jsonUrl = 'https://54.226.193.29:8080/reservation/'; 

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

  deleteReservation(id: number): Observable<void> {
    const url = `${this.jsonUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
