import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../core/environment"

@Injectable({
  providedIn: 'root'
})


export class OfficeService{

private auth:string='/auth'
private categorie:string='/categorie'

constructor(private http:HttpClient){}



getAllCategories(){
  return this.http.get(environment.API_URL+this.auth+this.categorie)
}

}
