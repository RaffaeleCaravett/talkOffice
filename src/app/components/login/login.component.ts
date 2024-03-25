import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
loginForm!:FormGroup
signupForm!:FormGroup
submitted:boolean=false
section:string ='login'
constructor(private toastr:ToastrService,private authService:AuthService,private router:Router){

}

ngOnInit(): void {
this.loginForm=new FormGroup({
email: new FormControl('',Validators.required),
password:new FormControl('',Validators.required)
})

this.signupForm=new FormGroup({
  email: new FormControl('',Validators.required),
  password:new FormControl('',Validators.required),
  nome: new FormControl('',Validators.required),
  cognome:new FormControl('',Validators.required),
  ripetiPassword:new FormControl('',Validators.required)
  })
  }

  login(){
    this.submitted=true
    if(this.loginForm.valid){
this.authService.logIn(
  {
email:this.loginForm.controls['email'].value,
password:this.loginForm.controls['password'].value
}).subscribe({
  next:(success:any)=>{
localStorage.setItem('accessToken',success.tokens.accessToken)
localStorage.setItem('refreshToken',success.tokens.refreshToken)
this.authService.authenticateUser(true)
this.authService.token=localStorage.getItem('accessToken')!
this.authService.verifyToken(this.authService.token).subscribe((data:any)=>{
  localStorage.setItem('user',JSON.stringify(data))
  this.router.navigate(['/office'])
})
  },
  error:(err:any)=>{
    this.toastr.show(err.error.message||"C'è stato un problema nell'elaborazione della richiesta")
  },
  complete:()=>{}
})
    }else{
      this.toastr.show("Completa il form prima")
    }
  }

  signup(){
    this.submitted=true
    if(this.signupForm.valid&&
      this.signupForm.controls['password'].value==this.signupForm.controls['ripetiPassword'].value){
this.authService.signUp(
  {
    nome:this.signupForm.controls['nome'].value,
    cognome:this.signupForm.controls['cognome'].value,
    email:this.signupForm.controls['email'].value,
password:this.signupForm.controls['password'].value
}).subscribe({
  next:(success:any)=>{
this.section='signup'
this.signupForm.reset()
this.submitted=false
this.toastr.show("User salvato")
  },
  error:(err:any)=>{
    this.toastr.show(err.error.message||"C'è stato un problema nell'elaborazione della richiesta")
  },
  complete:()=>{}
})
    }else if(this.signupForm.controls['password'].value!=this.signupForm.controls['ripetiPassword'].value){
      this.toastr.show("Le password non coincidono")
    }else{
      this.toastr.show("Completa il form prima")
    }
  }
}
