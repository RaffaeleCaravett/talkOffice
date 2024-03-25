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

}
