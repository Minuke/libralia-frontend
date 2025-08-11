import { Injectable, inject } from '@angular/core';
import { UsersService } from '../../../shared/services/users-service.service';
import { StorageService } from '@core/services/storage.service';
import { User } from '@shared/entities/interfaces/user.interface';
import { RegisterParams } from '../entities/interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly usersService = inject(UsersService);
  private readonly storageService = inject(StorageService);

  public register(params: RegisterParams): User | null {
    const users = this.usersService.users();
    const exists = users.some(u => u.email.toLowerCase() === params.email.toLowerCase());

    if (exists) return null;

    const newUser: User = {
      id: params.username.length,
      username: params.username,
      email: params.email,
      password: params.password1
    };

    this.usersService.addUser(newUser);
    return newUser;
  }

}
