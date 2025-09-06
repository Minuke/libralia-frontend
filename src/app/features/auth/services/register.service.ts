import { Injectable, inject } from '@angular/core';
import { UsersService } from '@shared/services/users-service.service';
import { UserDetails } from '@shared/entities/interfaces/user.interface';
import { RegisterParams } from '../entities/interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
  private readonly usersService = inject(UsersService);

  public register(params: RegisterParams): UserDetails | null {
    const exists = this.usersService.findByEmail(params.email);
    if (exists) return null;

    // const newUser: UserDetails = {
    //   id: Date.now(),
    //   username: params.username,
    //   email: params.email,
    //   password: params.password1
    // };

    // this.usersService.addUser(newUser);
    return null;
  }
}