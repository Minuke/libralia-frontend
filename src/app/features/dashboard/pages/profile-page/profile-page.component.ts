import { Component, computed, inject } from '@angular/core';
import { LoginService } from '@features/auth/services/login-service.service';
import { DataUserComponent } from '@features/dashboard/components/data-user/data-user.component';
import { UserBooksComponent } from '@features/dashboard/components/user-books/user-books.component';
import { WelcomeMessageComponent } from '@features/dashboard/components/welcome-message/welcome-messasge.component';
import { BooksService } from '@features/dashboard/services/books.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [WelcomeMessageComponent, DataUserComponent, UserBooksComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly loginService = inject(LoginService);
  private readonly booksService = inject(BooksService);

  public readonly currentUser = this.loginService.currentUser;
  public readonly user = computed(() => this.currentUser()!);

  // Computed reactivo que obtiene los libros del BooksService por userId
  public readonly userBooks = computed(() => {
    const userId = this.currentUser()!.id;
    return this.booksService.getBooksByAuthor(userId);
  });
}
