import { Component, input } from '@angular/core';
import { User } from '@shared/entities/interfaces/user.interface';

@Component({
  selector: 'app-welcome-message',
  standalone: true,
  templateUrl: './welcome-message.component.html',
  styleUrl: './welcome-message.component.scss'
})
export class WelcomeMessageComponent {
  public user = input.required<User>();
}
