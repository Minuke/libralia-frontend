import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { DataUserComponent } from '@features/dashboard/components/data-user/data-user.component';
import { WelcomeMessageComponent } from '@features/dashboard/components/welcome-message/welcome-messasge.component';
import { UserBooksComponent } from '../../components/user-books/user-books.component';
import { PaginatedBookResponse } from '@features/dashboard/entities/interfaces/books.interface';
import { BooksService } from '@features/dashboard/services/books.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [WelcomeMessageComponent, DataUserComponent, UserBooksComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly authService = inject(AuthService);
  private readonly booksService = inject(BooksService);

  public readonly currentUser = this.authService.user!;
  public readonly user = computed(() => this.currentUser()!);

  public readonly books = signal<PaginatedBookResponse | null>(null);
  public readonly loadingBooks = signal<boolean>(true);
  public readonly currentPage = signal<number>(1);

  public ngOnInit(): void {
    this.loadBooks();
  }

  public loadBooks(page: number = 1): void {
    this.loadingBooks.set(true);
    this.booksService.getBooksByAuthor(this.user().username, page).subscribe({
      next: (res) => {
        this.books.set(res);
        this.currentPage.set(page);
        this.loadingBooks.set(false);
      },
      error: (err) => {
        console.error('Error loading books:', err);
        this.loadingBooks.set(false);
      }
    });
  }

  public onPageChange(page: number): void {
    this.loadBooks(page);
  }

}
