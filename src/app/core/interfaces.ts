export interface UserRegistration {
  nome:string,
  cognome:string,
  email:string,
  password:string
}

export interface UserLogin {
email:string,
password:string
}

export interface Talk {
  categoria:string,
  testo1:string,
  testo2:string,
  testo3:string,
  titolo:string,
  user_id:number
  }

  export interface Immagine {
    posizione:string,
    talk_id:number
    }
