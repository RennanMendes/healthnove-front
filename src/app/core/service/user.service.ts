import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs'
import { environment } from 'src/environments/environment';
import { UserRequestDto } from '../types/User';
import { LoginDto } from '../types/Login';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;

  private loggedIn = new BehaviorSubject<boolean>(this.userIsLoggedIn());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  login(loginDto: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginDto).pipe(
      map(response => {
        try {
          const token = this.decodeToken(response.tokenJWT);
          localStorage.setItem('token', response.tokenJWT);
          localStorage.setItem('id', token.id);
          this.loggedIn.next(true);
          return response;
        } catch (error) {
          throw new Error('Token inválido');
        }
      })
    );
   }

  signUp(userDto: UserRequestDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, userDto)
  }

  userIsLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.loggedIn.next(false);
  }

  decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }
    const payload = parts[1];
    const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/');
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
  }

}
