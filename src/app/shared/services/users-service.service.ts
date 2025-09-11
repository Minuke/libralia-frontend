import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PasswordChange, PasswordReset, PatchedUserDetails, UserDetails } from '@shared/entities/interfaces/user.interface';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private readonly http = inject(HttpClient);

  public changePassword(payload: PasswordChange): Observable<PasswordChange> {
    return this.http
      .post<PasswordChange>(`${environment.apiUrl}/auth/password/change/`, payload)
  }

  public passwordReset(payload: PasswordReset): Observable<PasswordReset> {
    return this.http
      .post<PasswordReset>(`${environment.apiUrl}/auth/password/reset/`, payload)
  }

  public updateUser(payload: PatchedUserDetails): Observable<UserDetails> {
    return this.http.patch<UserDetails>(`${environment.apiUrl}/auth/user/`, payload);
  }
}
