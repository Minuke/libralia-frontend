import { Component, inject } from '@angular/core';
import { DataService } from '@core/services/data.service';
import { DataUserComponent } from '@features/dashboard/components/data-user/data-user.component';
import { WelcomeMessageComponent } from '@features/dashboard/components/welcome-message/welcome-messasge.component';
import { UserBooksComponent } from '../../components/user-books/user-books.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [WelcomeMessageComponent, DataUserComponent, UserBooksComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly dataService = inject(DataService);

  public readonly user = this.dataService.user;
  public readonly books = this.dataService.books;
  public readonly loadingBooks = this.dataService.loadingBooks;
  public readonly currentPage = this.dataService.currentPage;

  public ngOnInit(): void {
    const currentUser = this.user();
    if (currentUser) {
      this.dataService.loadBooks(1, currentUser.username);
    }
  }

  public onPageChange(page: number): void {
    const currentUser = this.user();
    if (currentUser) {
      this.dataService.loadBooks(page, currentUser.username);
    }
  }

  public onBookDeleted(bookId: string): void {
    this.dataService.removeBookFromList(bookId);
  }
}
