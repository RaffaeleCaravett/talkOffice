import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit{
user:any={}

  ngOnInit(): void {
if(localStorage.getItem('user')){
  this.user=JSON.parse(localStorage.getItem('user')!)
console.log(this.user)
}
  }

}
