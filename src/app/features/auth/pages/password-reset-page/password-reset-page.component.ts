import { Component } from '@angular/core';
import { PasswordResetFormComponent } from '@features/auth/components/password-reset-form/password-reset-form.component';

@Component({
  selector: 'app-password-reset-page',
  imports: [PasswordResetFormComponent],
  templateUrl: './password-reset-page.component.html',
  styleUrl: './password-reset-page.component.scss'
})
export class PasswordResetPageComponent {

}
