import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.development';
import { PaginatedBookResponse } from '../entities/interfaces/books.interface';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  private readonly http = inject(HttpClient);

  public getBooks(): Observable<PaginatedBookResponse> {
    return this.http.get<PaginatedBookResponse>(`${environment.booksUrl}/`);
  }

  public getBooksByAuthor(author: string, page: number = 1) {
    const params = new HttpParams()
      .set('search', author)
      .set('page', page);
    return this.http.get<PaginatedBookResponse>(`${environment.booksUrl}/`, { params });
  }

  public deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${environment.booksUrl}/${bookId}/delete/`);
  }
  
}
