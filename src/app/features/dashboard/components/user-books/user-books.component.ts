import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginatedBookResponse } from '@features/dashboard/entities/interfaces/books.interface';
import { BooksService } from '@features/dashboard/services/books.service';

@Component({
  selector: 'app-user-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.scss'
})
export class UserBooksComponent {

  private readonly booksService = inject(BooksService);

  public books = input<PaginatedBookResponse | null>();
  public currentPage = input<number>(1);

  public pageChange = output<number>();
  public bookDeleted = output<string>();

  public readonly pages = computed(() => {
    const b = this.books();
    if (!b?.pages) return [];
    return Array.from({ length: b.pages }, (_, i) => i + 1);
  });

  public goToPrevious(): void {
    if (this.books()?.has_previous) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  public goToNext(): void {
    if (this.books()?.has_next) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  public goToPage(page: number) {
    this.pageChange.emit(page);
  }

  public deleteBook(bookId: string) {
    if (!confirm('¿Estás seguro de que quieres eliminar este libro?')) return;

    this.booksService.deleteBook(bookId).subscribe({
      next: () => {
        alert('Libro eliminado correctamente');
        this.bookDeleted.emit(bookId);
      },
      error: (err) => {
        console.error('Error eliminando libro:', err);
        alert('No se pudo eliminar el libro');
      }
    });
  }
}