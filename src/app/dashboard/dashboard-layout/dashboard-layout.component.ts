import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee/services/employee.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
  isAdmin: boolean = false;
  employeeId: string | null = null;
  constructor(private authService: AuthService,
    private router: Router) {
    const roles = this.authService.getUserRole();
    if(roles==='Admin'){this.isAdmin = true;}
  }
// ngOnInit(){
//   this.employeeId = this.route.snapshot.paramMap.get('id');
//   if (this.employeeId) {
//     this.employeeService.getEmployeeById(this.employeeId).subscribe({
//       next: (data) => this.employee = data,
//       error: (err) => console.error('Error fetching employee:', err)
//     });
//   }
// }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
