import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from '../../core/types/Login';
import { UserService } from 'src/app/core/service/user.service';

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
    private userService: UserService
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

      this.userService.login(this.loginDto).subscribe({
        next: (value) => {
          this.loginForm.reset();
          this.userInvalid = false
          this.router.navigate(['/scheduling']);
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

}
