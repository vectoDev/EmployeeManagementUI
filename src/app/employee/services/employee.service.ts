import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  DepartmentId: number;
  DesignationId:number;
}
export interface EmployeeList {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfJoining: string;
  departmentName: string;
  designationName: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:5152/api/Employee';

  constructor(private http: HttpClient) {}

  getEmployeeById(id: string | null): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/GetEmployeeById/${id}`);
  }

  getAllEmployees(): Observable<EmployeeList[]> {
  var emp = this.http.get<EmployeeList[]>(`${this.baseUrl}/GetAllEmployees`);
  console.log(emp);
  return emp;
}


  deleteEmployee(id: string): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/DeleteEmployeeById/${id}`);
}
}
