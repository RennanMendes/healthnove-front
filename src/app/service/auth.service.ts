import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestDto } from '../components/dto/UserRequestDto';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  login() {

  }

  signUp(userDto: UserRequestDto): Observable<UserRequestDto> {
    return this.http.post<UserRequestDto>(`${this.baseUrl}/users`, userDto)
  }

  signIn(): Observable<UserRequestDto[]> {
    return this.http.get<UserRequestDto[]>(`${this.baseUrl}/users`);
  }




}
