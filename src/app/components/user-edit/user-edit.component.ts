import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/service/user.service';
import Swal from 'sweetalert2';

interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private id: string | null;

  form!: FormGroup;
  password: string;
  user: User;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      phone: '',
      email: ''
    }
  }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.findUserById()

    this.form = this.formBuilder.group({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      phone: new FormControl(this.user.phone, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email])
    });
  }

  findUserById() {
    this.userService.findById().subscribe(
      (resp: any) => {
        this.user = resp
        this.form.patchValue(this.user);
      },
      (error) => {
        this.alertError('Erro ao carregar dados de usuário!')
      }
    );
  }

  save() {
    if (this.form.valid) {
      this.user = this.form.value
      this.userService.update(this.user).subscribe(
        (resp: any) => {
          this.alertSuccess("Usuário atualizado com sucesso!")
          this.router.navigate(['/scheduling'])
        },
        (error) => {
          this.alertError('Erro ao atualizar usuário!')
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['/scheduling'])
  }

  alertSuccess(message: string) {
    Swal.fire({
      title: `<h5 style="color:green">${message}</h5>`,
      icon: 'success',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

  alertError(message: string) {
    Swal.fire({
      title: `<h5>${message}</h5>`,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

}
