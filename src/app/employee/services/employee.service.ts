import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: number;
  designationId: number;
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

export interface Createemployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: number;
  designationId: number;
}

export interface Department {
  id: number;
  name: string;
}

export interface Designation {
  id: number;
  title: string;
  departmentId: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeebaseUrl = 'http://localhost:5152/api/Employee';
  private commonbaseUrl = 'http://localhost:5152/api/Common';

  constructor(private http: HttpClient) {}

  getEmployeeById(id: string | null): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeebaseUrl}/GetEmployeeById/${id}`);
  }

  getAllEmployees(): Observable<EmployeeList[]> {
  var emp = this.http.get<EmployeeList[]>(`${this.employeebaseUrl}/GetAllEmployees`);
  console.log(emp);
  return emp;
}
 deleteEmployee(id: string): Observable<void> {
  return this.http.delete<void>(`${this.employeebaseUrl}/DeleteEmployeeById/${id}`);
}

getDepartments(): Observable<Department[]> {
  return this.http.get<Department[]>( `${this.commonbaseUrl}/GetAllDepartment`);
}

getDesignations(): Observable<Designation[]> {
  return this.http.get<Designation[]>( `${this.commonbaseUrl}/GetAllDesignation`);
}
createEmployee(employee: Employee): Observable<any> {
  return this.http.post(`${this.employeebaseUrl}/CreateEmployee`, employee);
}

updateEmployee(id: string, employee: Employee): Observable<any> {
  return this.http.put(`${this.employeebaseUrl}/UpdateEmployee/${id}`, employee);
}
}
