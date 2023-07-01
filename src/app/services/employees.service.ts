import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';



@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  baseApiUrl: string =environment.baseAPiUrl;

  constructor(private http:HttpClient) { }

  getAllEmployees(){
    return this.http.get<Employee[]>(this.baseApiUrl+'api/employee')
  }
  addEmployee(employee:Employee){
    employee.id='00000000-0000-0000-0000-000000000000'
    return this.http.post<Employee>(this.baseApiUrl+'api/employee',employee);
  }

  getEmployee(id:string){ 
    return this.http.get<Employee>(this.baseApiUrl+'api/employee/'+id);
  }

  updateEmployee(id:string,updateEmployeeRequest: Employee){
    return this.http.put(this.baseApiUrl+'api/employee/'+id,updateEmployeeRequest);
  }

  deleteEmployee(id:string){
   return this.http.delete(this.baseApiUrl+'api/employee/'+id);
  }
}
