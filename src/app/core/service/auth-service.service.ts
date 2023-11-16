import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { UserRequestDto } from '../types/User';
import { LoginDto } from '../types/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login(loginDto: LoginDto): Observable <any> {
    return this.http.post<UserRequestDto>(`${this.baseUrl}/login`, loginDto)
  }

  signUp(userDto: UserRequestDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, userDto)
  }

}
