import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserRequestDto } from '../dto/UserRequestDto';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userRequest: UserRequestDto = new UserRequestDto();
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  signUp() {
    if (this.userRequest.password != this.password) {
      alert('A senhas não estão iguais!');
    } else {      
      this.authService.signUp(this.userRequest).subscribe((resp: any) => {
        this.router.navigate(['/login']);
        alert("Usuário cadastrado com sucesso!")
      })
    }
  }

  cancel() {
    this.router.navigate(['/login']);
  }

  confirmPassword(event: any) {
    this.password = event.target.value
  }


}
