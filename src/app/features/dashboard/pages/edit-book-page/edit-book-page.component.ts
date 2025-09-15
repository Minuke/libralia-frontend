import { Component, computed, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { BookEditFormComponent } from '@features/dashboard/components/book-edit-form/book-edit-form.component';

@Component({
  selector: 'app-edit-book-page',
  imports: [BookEditFormComponent],
  templateUrl: './edit-book-page.component.html',
  styleUrl: './edit-book-page.component.scss'
})
export class EditBookPageComponent {
  private readonly authService = inject(AuthService);

  public readonly currentUser = this.authService.user;
  public readonly user = computed(() => this.currentUser()!);
}
