import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
loggedIn:boolean=false

constructor(private authService:AuthService){
  this.authService.isAuthenticated.subscribe((bool:boolean)=>{
    if(bool){
      this.loggedIn=bool
    }
  })
}

logout(){
localStorage.clear()
this.authService.token=''
this.authService.authenticateUser(false)
}
}
