import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

const ROLE_CLAIM = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5152/api/auth';
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  public isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(payload: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, payload).pipe(
      tap(tokens => {
        localStorage.setItem(this.accessTokenKey, tokens.accessToken);
        localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
        this.isLoggedIn.next(true);
      })
    );
  }

  logout() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    this.http.post(`${this.baseUrl}/logout`, { refreshToken }).subscribe({
      next:()=>{
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        this.isLoggedIn.next(false);
      },
      error:(err)=>{}
    });
    
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    const token = localStorage.getItem(this.accessTokenKey);
    return this.http.post<any>(`${this.baseUrl}/refresh`, { token, refreshToken }).pipe(
      tap(tokens => {
        localStorage.setItem(this.accessTokenKey, tokens.accessToken);
        localStorage.setItem(this.refreshTokenKey, tokens.refreshToken);
      })
    );
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  hasToken(): boolean {
    return !!this.getAccessToken();
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded[ROLE_CLAIM] || null;
    } catch (error) {
      return null;
    }
  }
  getEmployeeId(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode<{ employeeId?: string }>(token);
      return decoded.employeeId || null;
    }
    catch (error)
    {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
