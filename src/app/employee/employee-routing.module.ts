import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RoleGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    canActivate: [RoleGuard], 
    data: { roles: ['Admin'] }  // only admin can see employee list
  },
  {
    path: 'details/:id',
    component: EmployeeDetailsComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Employee'] }  // admin and employee can view details
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
