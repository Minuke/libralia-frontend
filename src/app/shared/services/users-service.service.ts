import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '@shared/entities/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private readonly http = inject(HttpClient);

  private readonly usersSignal = signal<User[]>([]);
  public readonly users = computed(() => this.usersSignal());

  constructor() {
    this.loadUsers();
  }

  /** Carga inicial de usuarios desde mock/API */
  private loadUsers(): void {
    this.http.get<User[]>('./mocks/users.json').subscribe({
      next: data => this.usersSignal.set(data),
      error: err => console.error('Error loading users:', err)
    });
  }

  /** Añadir un nuevo usuario */
  public addUser(user: User): void {
    this.usersSignal.update(users => [...users, user]);
  }

  /** Actualizar datos de un usuario existente */
  public updateUser(updated: User): void {
    this.usersSignal.update(users =>
      users.map(u =>
        u.email.toLowerCase() === updated.email.toLowerCase()
          ? { ...u, ...updated }
          : u
      )
    );
  }

  /** Buscar usuario por email */
  public findByEmail(email: string): User | undefined {
    return this.usersSignal().find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  /** Buscar usuario por username */
  public findByUsername(username: string): User | undefined {
    return this.usersSignal().find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
  }
}
