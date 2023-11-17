import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserRequestDto } from '../../core/types/User';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/core/service/auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;
  userRequest: UserRequestDto
  password: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService
  ) {
    this.userRequest = new UserRequestDto()
    this.userRequest.gender = '';
  }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)

    });
  }

  signUp() {
    if (this.form.valid) {
      this.userRequest = this.form.value;

      if (this.userRequest.password != this.form.get('confirmPassword')?.value) {
        alert('A senhas devem ser iguais!');
      } else {
        this.authService.signUp(this.userRequest).subscribe(
          (resp: any) => {
            alert("Usuário cadastrado com sucesso!");
            this.router.navigate(['/login']);
          },
          (error) => {
            if (error.error && error.error.length > 0) {
              const firstError = error.error[0];
              console.error('Erro ao cadastrar usuário:', firstError.message);
              alert('Erro ao cadastrar usuário: ' + firstError.message);
            } else {
              console.error('Erro ao cadastrar usuário:', error.message);
              alert('Erro ao cadastrar usuário: ' + error.message);
            }
          }
        );
      }
    } else {
      alert('Preencha todos os campos obrigatorios!');
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  confirmPassword(event: any) {
    this.password = event.target.value
  }

}
