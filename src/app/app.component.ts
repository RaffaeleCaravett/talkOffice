import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'talkOffice';

constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
      if(localStorage.getItem('accessToken')){
this.authService.verifyToken(localStorage.getItem('accessToken')!).subscribe({
  next:(success:any)=>{
  localStorage.setItem('user',JSON.stringify(success))
  this.authService.token=localStorage.getItem('accessToken')!
  this.authService.authenticateUser(true)
    this.router.navigate(['/office'])
  },
  error:(err:any)=>{
    if(localStorage.getItem('refreshToken')){
      this.authService.verifyRefreshToken(localStorage.getItem('refreshToken')!).subscribe({
        next:(success:any)=>{
          localStorage.setItem('accessToken',success.accessToken)
          localStorage.setItem('refreshToken',success.refreshToken)
          this.authService.token=localStorage.getItem('accessToken')!
          this.authService.verifyToken(this.authService.token).subscribe({
            next:(succes:any)=>{
              localStorage.setItem('user',JSON.stringify(success))
              this.authService.authenticateUser(true)
              this.router.navigate(['/office'])
            }
          })
        }
      })
    }else{
      this.authService.authenticateUser(false)
      this.authService.token=''
      this.router.navigate(['/'])
    }
  }
})
      }
  }
}
