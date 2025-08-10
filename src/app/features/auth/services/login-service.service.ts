import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../entities/interfaces/user.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly http = inject(HttpClient);

  private readonly usersSignal = signal<User[]>([]);
  public readonly users = computed(() => this.usersSignal());

  public loadUsers(): Observable<User[]> {
    return this.http.get<User[]>('./mocks/users.json')
      .pipe(tap(data => this.usersSignal.set(data)));
  }
}
