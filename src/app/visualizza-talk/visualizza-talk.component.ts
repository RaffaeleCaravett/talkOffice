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
  console.log('ihih')
  this.selectedImage=this.talk.immagini[0].link
}
if(this.talk.immagini&&this.talk.immagini[1]){
  console.log('ihih')
  this.selectedImage1=this.talk.immagini[1].link
}
if(this.talk.immagini&&this.talk.immagini[2]){
  console.log('ihih')
  this.selectedImage2=this.talk.immagini[2].link
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
    }

    }
  }

}
