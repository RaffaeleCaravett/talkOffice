import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { OfficeService } from 'src/app/service/office.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit,AfterViewInit{
user:any={}
categories:any[]=[]
displayedColumns: string[] = ['nome', 'cognome', 'email', 'linkProfilo','professione',
'eta','categoria','stato'];

@ViewChild(MatPaginator) paginator!: MatPaginator;

elements: any[] = [];
dataSource = new MatTableDataSource<any>(this.elements);
talkForm!:FormGroup
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
constructor(private officeService:OfficeService,private toastr:ToastrService){}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.officeService.getAllRichieste().subscribe({
  next:(categories:any)=>{
    this.dataSource= new MatTableDataSource<any>(categories.content)
    this.elements=categories.content
    setTimeout(()=>{
 if(this.dataSource.paginator){
 this.dataSource.paginator!.pageIndex=categories.pageable.pageNumber-1
    this.dataSource.paginator!.pageSize=categories.pageable.pageSize
this.dataSource.paginator!.length=categories.totalElements
    }
    },3000)
  }
})
}
  ngOnInit(): void {
if(localStorage.getItem('user')){
  this.user=JSON.parse(localStorage.getItem('user')!)
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

this.talkForm = new FormGroup({
testo1:new FormControl('',Validators.required),
testo2:new FormControl('',Validators.required),
testo3:new FormControl('',Validators.required),
categoria: new FormControl('',Validators.required),
titolo:new FormControl('',Validators.required)
})
this.immagine1= new FormGroup({
  immagine:new FormControl('',Validators.required),
  position:new FormControl('',Validators.required)
})
this.immagine2= new FormGroup({
  immagine:new FormControl('',Validators.required),
  position:new FormControl('',Validators.required)
})
this.immagine3= new FormGroup({
  immagine:new FormControl('',Validators.required),
  position:new FormControl('',Validators.required)
})
  }

changePage(evento:any){}



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

inserisciTalk(){
  this.submittedTalk=true
if(this.talkForm.valid){
  this.officeService.saveTalk(
    {
      titolo:this.talkForm.controls['titolo'].value,
      categoria:this.talkForm.controls['categoria'].value,
      testo1:this.talkForm.controls['testo1'].value,
      testo2:this.talkForm.controls['testo2'].value,
      testo3:this.talkForm.controls['testo3'].value,
      user_id:this.user.id
    }
  ).subscribe({
    next:(talk:any)=>{
      if(this.fileImage&&this.immagine1.valid){

        this.officeService.saveImage(
          {
            talk_id:talk.id,
            posizione:this.immagine1.controls['position'].value
          },this.fileImage
        ).subscribe({
          next:(next:any)=>{
          this.toastr.success("La prima immagine è stata caricata")
          },error:(err:any)=>{
            this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio della prima immagine.")
          }
        })
}
if(this.fileImage1&&this.immagine2.valid){

  this.officeService.saveImage(
    {
      talk_id:talk.id,
      posizione:this.immagine2.controls['position'].value
    },this.fileImage1
  ).subscribe({
    next:(next:any)=>{
    this.toastr.success("La seconda immagine è stata caricata")
    },error:(err:any)=>{
      this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio della seconda immagine.")
    }
  })
}
if(this.fileImage2&&this.immagine3.valid){

  this.officeService.saveImage(
    {
      talk_id:talk.id,
      posizione:this.immagine3.controls['position'].value
    },this.fileImage2
  ).subscribe({
    next:(next:any)=>{
this.toastr.success("La terza immagine è stata caricata")

    },error:(err:any)=>{
      this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio della terza immagine.")
    }
  })

  setTimeout(()=>{
this.toastr.show("Talk salvato.")
  },4000)
}
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
}
