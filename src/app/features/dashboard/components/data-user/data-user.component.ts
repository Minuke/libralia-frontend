import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserDetails } from '@shared/entities/interfaces/user.interface';

@Component({
  selector: 'app-data-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './data-user.component.html',
  styleUrl: './data-user.component.scss'
})
export class DataUserComponent {
  public user = input.required<UserDetails>();
}
