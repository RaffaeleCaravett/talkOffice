import { Component, Inject, OnInit } from '@angular/core';
import { OfficeService } from '../service/office.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-visualizza-talk',
  templateUrl: './visualizza-talk.component.html',
  styleUrls: ['./visualizza-talk.component.scss']
})
export class VisualizzaTalkComponent implements OnInit{

talk:any
talkForm!:FormGroup
images:any[]=[]
immagine1!:FormGroup
immagine2!:FormGroup
immagine3!:FormGroup
positions:any[]=['First','Second','Third']
fileImage:any
selectedImage:any
fileImage1:any
selectedImage1:any
fileImage2:any
selectedImage2:any
submittedTalk:boolean=false
categories:any[]=[]
firsSelectedImage:any
firsSelectedImage1:any
firsSelectedImage2:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<VisualizzaTalkComponent>,private toastr:ToastrService,
  private officeService:OfficeService) { }


  ngOnInit(){
this.talk=this.data
this.talkForm = new FormGroup({
  testo1:new FormControl(this.talk.testo1,Validators.required),
  testo2:new FormControl(this.talk.testo2,Validators.required),
  testo3:new FormControl(this.talk.testo2,Validators.required),
  categoria: new FormControl(this.talk.categoria,Validators.required),
  titolo:new FormControl(this.talk.titolo,Validators.required)
  })

       this.immagine1= new FormGroup({
    immagine:new FormControl('',Validators.required),
    position:new FormControl(this.talk.immagini&&this.talk.immagini[0]?this.talk.immagini[0].position:'',Validators.required)
  })
  this.immagine2= new FormGroup({
    immagine:new FormControl('',Validators.required),
    position:new FormControl(this.talk.immagini&&this.talk.immagini[1]?this.talk.immagini[1].position:'',Validators.required)
  })
  this.immagine3= new FormGroup({
    immagine:new FormControl('',Validators.required),
    position:new FormControl(this.talk.immagini&&this.talk.immagini[2]?this.talk.immagini[2].position:'',Validators.required)
  })
if(this.talk.immagini&&this.talk.immagini[0]){
  this.selectedImage=this.talk.immagini[0].link
  this.firsSelectedImage=this.talk.immagini[0].link
}
if(this.talk.immagini&&this.talk.immagini[1]){
  this.selectedImage1=this.talk.immagini[1].link
  this.firsSelectedImage1=this.talk.immagini[1].link
}
if(this.talk.immagini&&this.talk.immagini[2]){
  this.selectedImage2=this.talk.immagini[2].link
  this.firsSelectedImage2=this.talk.immagini[2].link
}
  this.officeService.getAllCategories().subscribe({
    next:(s:any)=>{
      this.categories=s
    },
    error:(e:any)=>{
      this.toastr.show(e.error.message||"C'è stato un errore nel recupero delle categorie.")
    },
    complete:()=>{}
  })
  }

  modificaTalk(){
    this.submittedTalk=true
    if(this.talkForm.valid){
      this.officeService.putTalk(
        this.talk.id,{
          titolo:this.talkForm.controls['titolo'].value,
          categoria:this.talkForm.controls['categoria'].value,
          testo1:this.talkForm.controls['testo1'].value,
          testo2:this.talkForm.controls['testo2'].value,
          testo3:this.talkForm.controls['testo3'].value,
          user_id:this.talk.user.id
        }
      ).subscribe({
        next:(talk:any)=>{
    this.toastr.show("Talk modificato.")
  this.talk=talk
  },
        error:(err:any)=>{
          this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio del talk.")
        },
        complete:()=>{}
      })
    }else{
      this.toastr.show("Completa il form prima.")
    }
  }

  readURL1(event: any): void {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0] && event.target.files[0].size > 1048576) {
       this.toastr.show("Dimensioni del file troppo grandi, massimo 1 MB")
    }else{
       this.fileImage = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.selectedImage = reader.result;
        reader.readAsDataURL(this.fileImage);
        this.modificaImmagine(0)
    }

    }
  }
  readURL2(event: any): void {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0] && event.target.files[0].size > 1048576) {
       this.toastr.show("Dimensioni del file troppo grandi, massimo 1 MB")
    }else{
       this.fileImage1 = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.selectedImage1 = reader.result;
        reader.readAsDataURL(this.fileImage1);
        this.modificaImmagine(1)
    }

    }
  }
  readURL3(event: any): void {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0] && event.target.files[0].size > 1048576) {
       this.toastr.show("Dimensioni del file troppo grandi, massimo 1 MB")
    }else{
       this.fileImage2 = event.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.selectedImage2 = reader.result;
        reader.readAsDataURL(this.fileImage2);
        this.modificaImmagine(2)
    }

    }
  }

deleteImage(index:number){
  if(index==0){
this.officeService.deleteImage(this.talk.immagini[index].id).subscribe((boolean:any)=>{
  if(boolean){
    this.toastr.success("Immagine cancellata.")
   this. firsSelectedImage=null
  }else{
    this.toastr.error("Immagine non cancellata.")
  }
})
  }else if(index==1){
this.officeService.deleteImage(this.talk.immagini[index].id).subscribe((boolean:any)=>{
  if(boolean){
    this.toastr.success("Immagine cancellata.")
    this.firsSelectedImage1=null
  }else{
    this.toastr.error("Immagine non cancellata.")
  }
})
  }else{
    this.officeService.deleteImage(this.talk.immagini[index].id).subscribe((boolean:any)=>{
      if(boolean){
        this.toastr.success("Immagine cancellata.")
        this.firsSelectedImage2=null
      }else{
        this.toastr.error("Immagine non cancellata.")
      }
    })
  }
}

modificaImmagine(index:number){
if(index==0&&this.immagine1.valid){
if(this.firsSelectedImage){
this.officeService.putImage(
  this.talk.immagini[index].id,
  this.talk.id,
  {
    talk_id:this.talk.id,
    posizione:this.immagine1.controls['position'].value
  },
  this.fileImage
).subscribe((image:any)=>{
  this.toastr.success("Immagine caricata")
  this.firsSelectedImage=image.link
})
}else{
 this.officeService.saveImage(
    {
      talk_id:this.talk.id,
      posizione:this.immagine1.controls['position'].value
    },this.fileImage
  ).subscribe({
    next:(next:any)=>{
this.toastr.success("La prima immagine è stata caricata")
this.firsSelectedImage=next.link
    },error:(err:any)=>{
      this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio della prima immagine.")
    }
  })
}
}else if(index==1&&this.immagine2.valid){
if(this.firsSelectedImage1){
this.officeService.putImage(
  this.talk.immagini[index].id,
  this.talk.id,
  {
    talk_id:this.talk.id,
    posizione:this.immagine2.controls['position'].value
  },
  this.fileImage1
).subscribe((image:any)=>{
  this.toastr.success("Immagine caricata")
  this.firsSelectedImage1=image.link
})
}else{
 this.officeService.saveImage(
    {
      talk_id:this.talk.id,
      posizione:this.immagine2.controls['position'].value
    },this.fileImage1
  ).subscribe({
    next:(next:any)=>{
this.toastr.success("La seconda immagine è stata caricata")
this.firsSelectedImage1=next.link
    },error:(err:any)=>{
      this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio della seconda immagine.")
    }
  })
}
}else if(index==2&&this.immagine3.valid){
if(this.firsSelectedImage2){
this.officeService.putImage(
  this.talk.immagini[index].id,
  this.talk.id,
  {
    talk_id:this.talk.id,
    posizione:this.immagine3.controls['position'].value
  },
  this.fileImage2
).subscribe((image:any)=>{
  this.toastr.success("Immagine caricata")
  this.firsSelectedImage2=image.link
})
}else{
 this.officeService.saveImage(
    {
      talk_id:this.talk.id,
      posizione:this.immagine3.controls['position'].value
    },this.fileImage2
  ).subscribe({
    next:(next:any)=>{
this.toastr.success("La terza immagine è stata caricata")
this.firsSelectedImage2=next.link
    },error:(err:any)=>{
      this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio della terza immagine.")
    }
  })
}
}else{
  this.toastr.error("Completa prima il form, assicurati di avere inserito la posizione.")
}
}

}
