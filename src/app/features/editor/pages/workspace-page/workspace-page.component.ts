import { Component, inject, input, signal, SimpleChanges } from '@angular/core';
import { BookResponse } from '@features/dashboard/entities/interfaces/books.interface';
import { BooksService } from '@features/dashboard/services/books.service';
import { SidePanelComponent } from '@features/editor/components/side-panel/side-panel.component';
import { TextEditorComponent } from '@features/editor/components/text-editor/text-editor.component';
import { TopicPanelComponent } from '@features/editor/components/topic-panel/topic-panel.component';
import { SidePanelService } from '@features/editor/services/side-panel.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-workspace-page',
  imports: [TextEditorComponent, SidePanelComponent, TopicPanelComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.scss'
})
export class WorkspacePageComponent {

  private readonly sidePanelService = inject(SidePanelService);
  private readonly booksService = inject(BooksService);

  public selectedOption = this.sidePanelService.selectedOption;
  public isManuscrito = this.sidePanelService.isManuscrito;

  public loading = signal(false);
  public error = signal<string | null>(null);
  public success = signal<string | null>(null);

  public book = signal<BookResponse | null>(null);

  public id = input.required<number>();

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id()) {
      this.fetchBook(this.id());
    }
  }

  private fetchBook(bookId: number): void {
    this.loading.set(true);

    this.booksService.getBookById(bookId).pipe(take(1)).subscribe({
      next: (book) => {
        this.book.set(book);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching book:', err);
        this.error.set('No se pudo cargar el libro');
        this.loading.set(false);
      }
    });
  }

}
