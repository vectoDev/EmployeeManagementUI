import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })

export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
  const expectedRoles: string[] = route.data['roles'] || [];
  const userRole = this.authService.getUserRole();
  
  // console.log('RoleGuard checking:', {
  //   expectedRoles,
  //   userRole,
  //   hasToken: this.authService.hasToken()
  // });

  if (!this.authService.hasToken()) {
    console.log('No token found - redirecting to login');
    this.router.navigate(['/login']);
    return false;
  }

  if (!expectedRoles.includes(userRole || '')) {
    console.warn(`Role ${userRole} not in allowed roles: ${expectedRoles.join(', ')}`);
    this.router.navigate(['/unauthorized']);
    return false;
  }

  return true;
}
}
