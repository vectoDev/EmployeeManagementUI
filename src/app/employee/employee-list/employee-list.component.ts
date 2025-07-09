import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeList, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  EmployeeList : EmployeeList[] = [];
  displayedColumns: string[] = ['id', 'name', 'email','department','Designation', 'actions'];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.EmployeeList = data;
        console.log('Employee list:', data);
      },
      error: (err) => console.error('Failed to fetch employees', err)
    });
  }

  editEmployee(id: string): void {
    console.log('Edit employee with ID:', id);
    // Navigate to edit component or open dialog
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }
}
