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

  entrar() {

    if (this.loginForm.valid) {

      this.loginDto.email = this.loginForm.value.email;
      this.loginDto.password = this.loginForm.value.password;

      this.authService.login(this.loginDto).subscribe({
        next: (value) => {

          console.log('Autenticado com sucesso', value)
          this.router.navigateByUrl('/')
          this.loginForm.reset();
        },
        error: (err) => {
          if (err.status == 403) {
            alert("Usuario ou senha incorreta!")
          }else{
            console.log('Problema na autenticação', err)
          }
        },
      })
    }
  }
}
