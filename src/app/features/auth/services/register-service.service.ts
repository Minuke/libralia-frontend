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

  public register(params: RegisterParams): boolean {
    const users = this.usersService.users();
    const exists = users.some(
      u => u.username.toLowerCase() === params.username.toLowerCase()
        || u.email.toLowerCase() === params.email.toLowerCase()
    );
    if (exists) {
      console.error('❌ Usuario o email ya existente');
      return false;
    }

    const newUser: User = {
      username: params.username,
      email: params.email,
      password: params.password1
    };

    this.usersService.addUser(newUser);
    this.storageService.setUser(newUser);
    return true;
  }
}
