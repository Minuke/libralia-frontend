import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StorageService } from '@core/services/storage.service';
import { UserDetails } from '@shared/entities/interfaces/user.interface';
import { environment } from 'environments/environment.development';
import { tap } from 'rxjs';
import { JWT } from '../entities/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly http = inject(HttpClient);
  private readonly storageService = inject(StorageService);

  public register(params: JWT) {
    return this.http.post<JWT>(`${environment.apiUrl}/auth/register/`, params).pipe(
      tap((response) => {
        this.setSession(response.user, response.access, response.refresh);
      }),
    );
  }

  private setSession(user: UserDetails, access: string, refresh: string): void {
    this.storageService.setUser(user);
    this.storageService.setAccessToken(access);
    this.storageService.setRefreshToken(refresh);
  }

}