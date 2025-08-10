import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '@features/auth/services/login-service.service';
import { BooksService } from '@shared/services/books.service';

@Component({
  selector: 'app-profile-page',
  imports: [RouterLink],
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
