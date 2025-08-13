import { Component, computed, inject } from '@angular/core';
import { LoginService } from '@features/auth/services/login-service.service';
import { ProfileEditFormComponent } from '@features/dashboard/components/profile-edit-form/profile-edit-form.component';

@Component({
  selector: 'app-profile-edit-page',
  imports: [ProfileEditFormComponent],
  templateUrl: './profile-edit-page.component.html',
  styleUrl: './profile-edit-page.component.scss'
})
export class ProfileEditPageComponent {
  private readonly loginService = inject(LoginService);

  public readonly currentUser = this.loginService.currentUser;

  public readonly user = computed(() => this.currentUser()!);
}
