import { Component, computed, inject } from '@angular/core';
import { LoginService } from '@features/auth/services/login-service.service';
import { DataUserComponent } from '@features/dashboard/components/data-user/data-user.component';
import { WelcomeMessageComponent } from '@features/dashboard/components/welcome-message/welcome-messasge.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [WelcomeMessageComponent, DataUserComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly loginService = inject(LoginService);
  // private readonly booksService = inject(BooksService);

  public readonly currentUser = this.loginService.currentUser;
  public readonly user = computed(() => this.currentUser()!);

  // Computed reactivo que obtiene los libros del BooksService por userId
  // public readonly userBooks = computed(() => {
  //   const userId = this.currentUser()!.pk;
  //   return this.booksService.getBooksByAuthor(userId);
  // });
}
