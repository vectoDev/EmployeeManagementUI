import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeList, EmployeeService } from '../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeCreateComponent } from '../employee-create/employee-create.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeList[] = [];
  displayedColumns: string[] = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'departmentName',
  'designationName',
  'actions'
];

  constructor(private empService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.empService.getAllEmployees().subscribe(data => this.employees = data);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EmployeeCreateComponent, {
      width: '600px',
       maxHeight: '100vh',
  panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadEmployees();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EmployeeEditComponent, {
      width: '600px',
      maxHeight: '100vh',
      panelClass: 'custom-dialog-container',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadEmployees();
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.empService.deleteEmployee(id).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error('Delete failed', err)
      });
    }
  }
}
