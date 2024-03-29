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
private immagini:string='/immagini'

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
saveImage(immagine:{},file:any){
  const formData: FormData = new FormData();


  const json = JSON.stringify(immagine);
  const blob = new Blob([json], {
    type: 'application/json'
  });
  formData.append('immagineDTO', blob);
      formData.append('file', file, file.name);

  return this.http.post(environment.API_URL + this.immagini, formData);
 }
 getTalk(page?:number){
  if(page){
    return this.http.get(environment.API_URL + this.talk+`?page=${page}`);
  }else{
  return this.http.get(environment.API_URL + this.talk);
  }
 }
 putTalk(id:number,talk:{}){
  return this.http.put(environment.API_URL + this.talk+'/'+id,talk);
 }
 deleteImage(index:number){
return this.http.delete(environment.API_URL + this.immagini+'/'+index)
 }
}
