import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '@features/dashboard/entities/interfaces/book.interface';

@Component({
  selector: 'app-user-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.scss'
})
export class UserBooksComponent {
  public userBooks = input<Book[]>();
}
