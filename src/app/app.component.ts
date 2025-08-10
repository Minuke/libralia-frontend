import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './features/auth/services/users-service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
