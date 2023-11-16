import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../../core/types/Login';
import { AuthServiceService } from 'src/app/core/service/auth-service.service';

export interface TokenJwt {
  token: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  email: string = '';
  password: string = '';
  loginDto: LoginDto
  userInvalid: boolean = false

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService
  ) {
    this.loginDto = new LoginDto();

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginDto.email = this.loginForm.value.email;
      this.loginDto.password = this.loginForm.value.password;

      this.authService.login(this.loginDto).subscribe({
        next: (value) => {
          const decodedToken = this.decodeToken(value.tokenJWT);
          localStorage.setItem('token', value.tokenJWT);
          localStorage.setItem('id', decodedToken.id);
          console.log('Autenticado com sucesso', decodedToken)
          this.router.navigateByUrl('/')
          this.loginForm.reset();
          this.userInvalid = false
        },
        error: (err) => {
          if (err.status == 403) {
            this.userInvalid = true
          } else {
            console.log('Problema na autenticação', err)
          }
        },
      })
    }

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
