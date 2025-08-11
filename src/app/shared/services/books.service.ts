import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Book } from '@shared/entities/interfaces/book.interface';

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

  private loadBooks(): void {
    this.http.get<Book[]>('./mocks/books.json')
      .subscribe({
        next: (data) => this.booksSignal.set(data),
        error: (err) => console.error('Error loading books:', err)
      });
  }


  public addBook(book: Book): void {
    this.booksSignal.update(books => [...books, book]);
  }

  /**
 * Devuelve un array de libros cuyo author coincida con el username dado
 */
  public getBooksByAuthor(userId: number): Book[] {
    return this.booksSignal().filter(book => book.authorId === userId);
  }


}
