import { Component, computed, inject } from '@angular/core';
import { LoginService } from '@features/auth/services/login-service.service';
import { ProfileEditFormComponent } from '@features/dashboard/components/profile-edit-form/profile-edit-form.component';

@Component({
  selector: 'app-edit-user-page',
  imports: [ProfileEditFormComponent],
  templateUrl: './edit-user-page.component.html',
  styleUrl: './edit-user-page.component.scss'
})
export class EditUserPageComponent {
  private readonly loginService = inject(LoginService);

  public readonly currentUser = this.loginService.currentUser;

  public readonly user = computed(() => this.currentUser()!);
}
