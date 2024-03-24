import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthGuard } from "../core/auth.guard";
import { environment } from "../core/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})


export class AuthService{

public isAuthenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
public auth:string='/auth'
public register:string='/register'
public login:string='/login'
public token:string = ''
constructor(private authGuard:AuthGuard,private http:HttpClient){}

authenticateUser(bool:boolean){
this.authGuard.authenticateUser(bool)
this.isAuthenticated.next(bool);
}
signUp(user:{}){
  return this.http.post(environment.API_URL + this.auth+this.register, user);
}
logIn(body:{}){
  return this.http.post(environment.API_URL+this.auth+this.login,body)
}
verifyEsecizioToken(token:string){
  return this.http.get(environment.API_URL+this.auth+token)
}
verifyEsecizioRefreshToken(refreshToken:string){
  return this.http.get(environment.API_URL+this.auth+'/refreshToken/'+refreshToken)
}
}
