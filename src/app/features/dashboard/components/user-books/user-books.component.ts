import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginatedBookResponse } from '@features/dashboard/entities/interfaces/books.interface';

@Component({
  selector: 'app-user-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-books.component.html',
  styleUrl: './user-books.component.scss'
})
export class UserBooksComponent {

  public books = input<PaginatedBookResponse | null>();
  public currentPage = input<number>(1);
  public pageChange = output<number>();

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


}
