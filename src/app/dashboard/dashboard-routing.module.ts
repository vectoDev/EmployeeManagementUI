import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { RoleGuard } from '../auth/guards/auth.guard';
import { EmployeeDetailsComponent } from '../employee/employee-details/employee-details.component';
import { EmployeeListComponent } from '../employee/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'employee/details', pathMatch: 'full' },
      {
        path: 'employee/list',
        component: EmployeeListComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Admin'] }
      },
      {
        path: 'employee/details',
        component: EmployeeDetailsComponent,
        canActivate: [RoleGuard],
        data: { roles: ['Admin', 'Employee'] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
