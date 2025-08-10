import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../../../shared/entities/interfaces/user.interface';

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

  private loadUsers(): void {
    this.http.get<User[]>('./mocks/users.json')
      .subscribe({
        next: (data) => this.usersSignal.set(data),
        error: (err) => console.error('Error loading users:', err)
      });
  }
}
