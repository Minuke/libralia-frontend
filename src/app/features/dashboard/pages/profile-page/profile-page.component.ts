import { Component, computed, inject, signal } from '@angular/core';
import { LoginService } from '@features/auth/services/login-service.service';
import { Book } from '@shared/entities/interfaces/book.interface';
import { BooksService } from '@shared/services/books.service';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  private readonly loginService = inject(LoginService);
  private readonly booksService = inject(BooksService);

  public readonly isAuthenticated = this.loginService.isAuthenticated;
  public readonly currentUser = this.loginService.currentUser;

  public readonly userBooks = computed(() => {
    const username = this.currentUser()!.username;
    return this.booksService.getBooksByAuthor(username);
  });

}
