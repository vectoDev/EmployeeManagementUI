import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Createemployee, Department, Designation, Employee, EmployeeService } from '../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
})
export class EmployeeCreateComponent implements OnInit {
  form!: FormGroup;
  departments: Department[] = [];
  designations: Designation[] = [];
  filteredDesignations: Designation[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeCreateComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      departmentId: [null, Validators.required],
      designationId: [null, Validators.required]
    });

    this.employeeService.getDepartments().subscribe(data => this.departments = data);
    this.employeeService.getDesignations().subscribe(data => this.designations = data);

    this.form.get('departmentId')?.valueChanges.subscribe(deptId => {
      this.filteredDesignations = this.designations.filter(d => d.departmentId === +deptId);
      this.form.get('designationId')?.setValue(null);
    });
  }

 submit(): void {
  if (this.form.valid) {
    const newEmployee: Createemployee = this.form.value;
    this.employeeService.createEmployee(newEmployee).subscribe({
      next: () => {
        alert('Employee Created Successfully!');
        this.dialogRef.close();
      },
      error: (err) => {
        console.log("Err in Create",err)
        if (err.status === 400 && err.error?.message) {
          alert(err.error.message);
        } else {
          alert('An unexpected error occurred.');
        }
      }
    });
  }
}

}
