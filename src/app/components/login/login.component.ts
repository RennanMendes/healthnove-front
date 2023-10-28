import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  email: string
  password: string

  user = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl (this.email, [Validators.required, Validators.email]),
      password: new FormControl (this.password, Validators.required)
    })
  }

  entrar() {

    if (this.loginForm.valid) {
       this.email = this.loginForm.value.email;
       this.password = this.loginForm.value.password;

      this.authService.signIn().subscribe({
        next: (value) => {
          console.log('Autenticado com sucesso', value)
          this.router.navigateByUrl('/')
          this.loginForm.reset();
        },
        error: (err) => {
          console.log('Problema na autenticação', err)
        },
      })
    }


  }


}
