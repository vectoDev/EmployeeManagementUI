import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Designation, EmployeeService, Employee, Createemployee } from '../services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
})
export class EmployeeEditComponent implements OnInit {
  form!: FormGroup;
  departments: Department[] = [];
  designations: Designation[] = [];
  filteredDesignations: Designation[] = [];
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
   private dialogRef: MatDialogRef<EmployeeEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.employeeId = this.data.id.toString();
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      departmentId: [null, Validators.required],
      designationId: [null, Validators.required]
    });

    this.employeeService.getDepartments().subscribe(data => this.departments = data);
    this.employeeService.getDesignations().subscribe(data => {
      this.designations = data;
      debugger;
      this.employeeService.getEmployeeById(this.employeeId).subscribe(emp => {
      this.form.patchValue(emp);
      this.form.controls['email'].disable();
      this.filteredDesignations = this.designations.filter(d => d.departmentId === emp.departmentId);
      });
    });

    this.form.get('departmentId')?.valueChanges.subscribe(deptId => {
      this.filteredDesignations = this.designations.filter(d => d.departmentId === +deptId);
      this.form.get('designationId')?.setValue(null);
    });
  }

  submit(): void {
    if (this.form.valid) {
      const updatedEmployee: Createemployee = this.form.value;
      updatedEmployee.id =Number(this.employeeId);
      updatedEmployee.id = +this.employeeId;

      this.employeeService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
      next: () => {
        alert('Employee Updated Successfully!');
        this.dialogRef.close();
      },
      error: (err) => {
        console.log("Err in Update",err)
        if (err.status === 400 && err.error?.message) {
          alert(err.error.message);
        } else {
          alert('An unexpected error occurred.');
        }
      }
    });
    }
  }

  onCancel(): void {
  this.dialogRef.close();
}
}
