import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { BooksService } from '@features/dashboard/services/books.service';
import { BookResponse, PaginatedBookResponse } from '@features/dashboard/entities/interfaces/books.interface';
import { UserDetails } from '@shared/entities/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly authService = inject(AuthService);
  private readonly booksService = inject(BooksService);

  public readonly user = this.authService.user;
  public readonly books = signal<PaginatedBookResponse | null>(null);
  public readonly loadingBooks = signal<boolean>(false);
  public readonly currentPage = signal<number>(1);

  public loadInitialData(): void {
    const currentUser: UserDetails | null = this.authService.getUser();
    if (!currentUser) {
      console.warn('⚠️ No hay usuario autenticado, no se cargan libros');
      return;
    }

    this.loadBooks(1, currentUser.username);
  }

  public loadBooks(page: number, username: string): void {
    this.loadingBooks.set(true);

    this.booksService.getBooksByAuthor(username, page).subscribe({
      next: (res: PaginatedBookResponse) => {
        this.books.set(res);
        this.currentPage.set(page);
        this.loadingBooks.set(false);
      },
      error: (err) => {
        console.error('❌ Error cargando libros:', err);
        this.loadingBooks.set(false);
      }
    });
  }

  public removeBookFromList(bookId: string): void {
    const current = this.books();
    if (!current) return;

    this.books.set({
      ...current,
      results: current.results.filter(b => b.id !== bookId),
    });
  }

  public updateBookInList(updatedBook: BookResponse): void {
    const currentBooks = this.books();
    if (!currentBooks) return;

    const updatedResults = currentBooks.results.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );

    this.books.set({
      ...currentBooks,
      results: updatedResults
    });
  }
}
