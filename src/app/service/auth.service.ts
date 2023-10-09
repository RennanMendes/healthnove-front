import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestDto } from '../components/dto/UserRequestDto';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login() {

  }

  signUp(userDto: UserRequestDto): Observable<UserRequestDto> {
    return this.http.post<UserRequestDto>("http://localhost:8080/users", userDto)
  }



}
