import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import jspdf from 'jspdf'; 
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})

export class EmployeesListComponent {

displayedColumns: string[]=['Id','name','email','phone','salary','department','edit','delete'];
employees:any;
dataSource:any;
@ViewChild(MatPaginator) paginator !:MatPaginator;
@ViewChild(MatSort) sort !:MatSort;
constructor(private employeesService: EmployeesService ,private router:Router){

}

ngOnInit(): void {
 this.getdate();
}
getdate()
{
  this.employeesService.getAllEmployees()
  .subscribe({
    next:   (employees:any)=>{
      this.employees =employees;
      this.dataSource=new MatTableDataSource<Employee>(this.employees);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
    error: (response:any)=>{
       console.log(response);
    }
  })
}
Filterchange(event:Event){
  const filvalue=(event.target as HTMLInputElement).value;
  this.dataSource.filter=filvalue; 
}

deleteEmployee(id:string){
this.employeesService.deleteEmployee(id)
.subscribe({
  next:(response:any)=>{
    this.getdate();
  }
  
});

}

downloadpdf=()=>{  
  const doc=new jspdf()
  
doc.text("Employee Details",20,10)
autoTable(doc, { html: '#my-table' })
doc.save("table.pdf")
}  

}