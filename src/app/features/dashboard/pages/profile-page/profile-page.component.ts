import { Component, computed, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { DataUserComponent } from '@features/dashboard/components/data-user/data-user.component';
import { WelcomeMessageComponent } from '@features/dashboard/components/welcome-message/welcome-messasge.component';
import { UserBooksComponent } from '../../components/user-books/user-books.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [WelcomeMessageComponent, DataUserComponent, UserBooksComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly authService = inject(AuthService);

  public readonly currentUser = this.authService.user!;
  public readonly user = computed(() => this.currentUser()!);

}
