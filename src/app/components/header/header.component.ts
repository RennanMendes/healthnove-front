import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false
  
  constructor(
    private userService: UserService
  ) {

   }

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe(loggedIn => {
      console.log("loggedIn "+loggedIn);
      
      this.isLoggedIn = loggedIn;
    });
  }

  logout(){
    localStorage.clear();
  }

  userIsLoggedIn(){
    return !!localStorage.getItem('token');
  }

}
