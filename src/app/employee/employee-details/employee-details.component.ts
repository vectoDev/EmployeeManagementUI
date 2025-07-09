import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee | null = null;
  employeeId: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeId = this.authService.getEmployeeId(); 
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next:  (data) => {
          this.employee = data;
          console.log('Fetched employee:', data);
        },
        error: (err) => console.error('Error fetching employee:', err)
      });
    }
  }
}
