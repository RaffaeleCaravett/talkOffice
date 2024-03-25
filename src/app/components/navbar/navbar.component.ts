import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
loggedIn:boolean=false

constructor(private authService:AuthService,private router:Router){
  this.authService.isAuthenticated.subscribe((bool:boolean)=>{
    if(bool){
      console.log(bool)
      this.loggedIn=bool
    }
  })
}

logout(){
localStorage.clear()
this.authService.token=''
this.authService.authenticateUser(false)
this.router.navigate(['/'])
}


}
