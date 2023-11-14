import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { LoginDto } from '../../core/types/Login';
import { TokenService } from 'src/app/core/service/token.service';
import { environment } from 'src/environments/environment.prod';

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
    private authService: AuthService
  ) { }

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

      //   this.authService.login(this.loginDto).subscribe({
      //     next: (value) => {
      //       environment.token = value.body?.access_token ?? ''
      //       console.log('Autenticado com sucesso', value)
      //       this.router.navigateByUrl('/')
      //       this.loginForm.reset();
      //     },
      //     error: (err) => {
      //       console.log('Problema na autenticação', err)
      //     },
      //   })
      // }


      this.authService.login(this.loginDto).subscribe(
        response => {
          console.log('Autenticado com sucesso', response)
          const token = response.body?.access_token;
          this.authService.setToken(token??'');
          
          // Redirecione para a página principal ou faça qualquer outra ação necessária após o login

          this.router.navigateByUrl('/')
      }, erro => {
        if (erro.status == 500 || erro.status == 401|| erro.status == 403) {
          alert("Usuario ou senha incorreta!")
        }
      })



    }
  }

}
