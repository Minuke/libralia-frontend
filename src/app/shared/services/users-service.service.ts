import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserDetails } from '@shared/entities/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private readonly http = inject(HttpClient);

  private readonly usersSignal = signal<UserDetails[]>([]);
  public readonly users = computed(() => this.usersSignal());

  constructor() {
    this.loadUsers();
  }

  /** Carga inicial de usuarios desde mock/API */
  private loadUsers(): void {
    this.http.get<UserDetails[]>('./mocks/users.json').subscribe({
      next: data => this.usersSignal.set(data),
      error: err => console.error('Error loading users:', err)
    });
  }

  /** Añadir un nuevo usuario */
  public addUser(user: UserDetails): void {
    this.usersSignal.update(users => [...users, user]);
  }

  /** Actualizar datos de un usuario existente */
  public updateUser(updated: UserDetails): void {
    this.usersSignal.update(users =>
      users.map(u =>
        u.email.toLowerCase() === updated.email.toLowerCase()
          ? { ...u, ...updated }
          : u
      )
    );
  }

  /** Buscar usuario por email */
  public findByEmail(email: string): UserDetails | undefined {
    return this.usersSignal().find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  /** Buscar usuario por username */
  public findByUsername(username: string): UserDetails | undefined {
    return this.usersSignal().find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
  }
}
