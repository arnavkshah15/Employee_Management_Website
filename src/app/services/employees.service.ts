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
    return this.http.get<Employee[]>(this.baseApiUrl+'api/employees')
  }
  addEmployee(addEmployeeRequest:Employee){
    addEmployeeRequest.id='00000000-0000-0000-0000-000000000000'
    return this.http.post<Employee>(this.baseApiUrl+'api/employees',addEmployeeRequest);
  }
}