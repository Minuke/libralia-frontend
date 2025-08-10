import { inject, Injectable, signal, computed } from '@angular/core';
import { UsersService } from '../../../shared/services/users-service.service';
import { StorageService } from '@core/services/storage.service';
import { LoginEmailParams, LoginUsernameParams } from '../entities/interfaces/login.interface';
import { User } from '@shared/entities/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly usersService = inject(UsersService);
  private readonly storageService = inject(StorageService);

  private readonly currentUserSignal = signal<User | null>(null);

  public readonly currentUser = computed(() => this.currentUserSignal());
  public readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  constructor() {
    const storedUser = this.storageService.getUser();
    if (storedUser) {
      this.currentUserSignal.set(storedUser);
    }
  }

  public login(params: LoginEmailParams | LoginUsernameParams): boolean {
    const users = this.usersService.users();
    let user: User | undefined;

    if ('email' in params) {
      user = users.find(u => u.email.toLowerCase() === params.email.toLowerCase());
    } else {
      user = users.find(u => u.username.toLowerCase() === params.username.toLowerCase());
    }

    if (user && user.password === params.password) {
      this.currentUserSignal.set(user);
      this.storageService.setUser(user);
      return true;
    }

    this.currentUserSignal.set(null);
    this.storageService.clearUser();
    return false;
  }

  public logout(): void {
    this.currentUserSignal.set(null);
    this.storageService.clearUser();
  }
}
