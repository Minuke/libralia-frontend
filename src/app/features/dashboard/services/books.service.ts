import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { BookResponse, PaginatedBookResponse } from '../entities/interfaces/books.interface';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  private readonly http = inject(HttpClient);

  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  public books = signal<PaginatedBookResponse | null>(null);

  public getBooks(): Observable<PaginatedBookResponse> {
    return this.http.get<PaginatedBookResponse>(`${environment.booksUrl}/`);
  }

  public getBooksByAuthor(author: string, page: number = 1): Observable<PaginatedBookResponse> {
    const params = new HttpParams()
      .set('search', author)
      .set('page', page);
    return this.http.get<PaginatedBookResponse>(`${environment.booksUrl}/`, { params });
  }

  public deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${environment.booksUrl}/${bookId}/delete/`);
  }

  public createBook(book: any): Observable<BookResponse> {
    this.loading.set(true);
    this.error.set(null);

    return new Observable<BookResponse>((observer) => {
      this.http.post<BookResponse>(`${environment.booksUrl}/create/`, book).subscribe({
        next: (res) => {
          this.loading.set(false);
          observer.next(res);
          observer.complete();
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(
            err?.error?.message || 'Error creando el libro. Inténtalo de nuevo.'
          );
          observer.error(err);
        },
      });
    });
  }

  public getBookById(id: string): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${environment.booksUrl}/${id}/`);
  }

}
