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

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:5152/api/Employee';

  constructor(private http: HttpClient) {}

  getEmployeeById(id: string | null): Observable<Employee> {
    debugger;
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }
}
