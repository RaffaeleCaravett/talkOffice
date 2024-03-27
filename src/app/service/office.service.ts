import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../core/environment"

@Injectable({
  providedIn: 'root'
})


export class OfficeService{

private auth:string='/auth'
private categorie:string='/categorie'
private richiesteTalk:string='/richiesteTalk'
private talk:string='/talk'

constructor(private http:HttpClient){}



getAllCategories(){
  return this.http.get(environment.API_URL+this.auth+this.categorie)
}

getAllRichieste(){
  return this.http.get(environment.API_URL+this.richiesteTalk)
}
leggi(richiestaId:number){
  return this.http.get(environment.API_URL+this.richiesteTalk+`/leggi/${richiestaId}`)
}
getByCategoria(categoria:string){
return this.http.get(environment.API_URL+this.richiesteTalk+`/categoria?categoria=${categoria||'Fitness'}`)
}

saveTalk(talk:{}){
  return this.http.post(environment.API_URL+this.talk,talk)
}
}
