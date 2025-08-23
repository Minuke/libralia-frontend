import { Injectable } from '@angular/core';
import { User } from '@shared/entities/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private readonly USER_KEY = 'currentUser';

  public setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as User;
    } catch {
      console.error('Error parsing stored user JSON');
      return null;
    }
  }

  public clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}