import { inject, Injectable, signal, computed } from '@angular/core';
import { UsersService } from './users-service.service';
import { LoginEmailParams, LoginUsernameParams } from '../entities/interfaces/login.interface';
import { User } from '../entities/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly usersService = inject(UsersService);

  // Señal interna (privada) que guarda el usuario autenticado
  private readonly currentUserSignal = signal<User | null>(null);

  // Exponemos una computed pública para acceder reactivamente al usuario
  public readonly currentUser = computed(() => this.currentUserSignal());

  // Flag de autenticación como computed pública
  public readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  /** Intenta autenticar al usuario */
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
      return true;
    }

    this.currentUserSignal.set(null);
    return false;
  }

  public logout(): void {
    this.currentUserSignal.set(null);
  }
}
