import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
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

  login(loginDto: LoginDto): Observable <any> {
    this.loggedIn.next(true);
    return this.http.post<UserRequestDto>(`${this.baseUrl}/login`, loginDto)
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

}
