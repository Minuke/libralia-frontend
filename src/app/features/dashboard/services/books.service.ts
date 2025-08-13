import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Book } from '../entities/interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  private readonly http = inject(HttpClient);

  private readonly booksSignal = signal<Book[]>([]);
  public readonly books = computed(() => this.booksSignal());

  constructor() {
    this.loadBooks();
  }

  /** Cargar libros iniciales */
  private loadBooks(): void {
    this.http.get<Book[]>('./mocks/books.json').subscribe({
      next: data => this.booksSignal.set(data),
      error: err => console.error('Error loading books:', err)
    });
  }

  /** Añadir un nuevo libro */
  public addBook(book: Book): void {
    this.booksSignal.update(books => [...books, book]);
  }

  /** Libros por ID de autor */
  public getBooksByAuthor(authorId: number): Book[] {
    return this.booksSignal().filter(book => book.authorId === authorId);
  }
}
