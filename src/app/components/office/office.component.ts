import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  }

changePage(evento:any){}

}
