import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../entities/interfaces/user.interface';
import { Observable, tap } from 'rxjs';
import { LoginEmailParams, LoginUsernameParams } from '../entities/interfaces/login.interface';
import { UsersService } from './users-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly usersService = inject(UsersService);

  public validateCredentials(params: LoginEmailParams | LoginUsernameParams): boolean {
    const users = this.usersService.users();
    let user: User | undefined;

    if ('email' in params) {
      user = users.find(u => u.email.toLowerCase() === params.email.toLowerCase());
    } else {
      user = users.find(u => u.username.toLowerCase() === params.username.toLowerCase());
    }

    return !!user && user.password === params.password;
  }

}
