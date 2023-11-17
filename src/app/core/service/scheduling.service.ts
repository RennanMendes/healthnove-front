import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  private baseUrl: string = environment.baseUrl;
  private token: string | null;
  private id: string | null;
  private headers: HttpHeaders


  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('id')
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  }


  findByUserId(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/appointments/user/${this.id}`, { headers: this.headers })
  }

  delete(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/appointments/${userId}`, { headers: this.headers })
  }


}
