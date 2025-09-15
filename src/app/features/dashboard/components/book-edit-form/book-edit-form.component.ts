import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookResponse } from '@features/dashboard/entities/interfaces/books.interface';
import { BooksService } from '@features/dashboard/services/books.service';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-book-edit-form',
  imports: [ReactiveFormsModule, InputErrorsComponent, RouterLink],
  templateUrl: './book-edit-form.component.html',
  styleUrl: './book-edit-form.component.scss'
})
export class BookEditFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly booksService = inject(BooksService);
  private readonly route = inject(ActivatedRoute);

  public bookEditForm!: FormGroup;
  public loading = signal(false);
  public error = signal<string | null>(null);
  public success = signal<string | null>(null);

  private bookId!: string;
  public book = signal<BookResponse | null>(null);

  public ngOnInit(): void {
    this.bookEditForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.loadBook();
  }

  private loadBook(): void {
    this.loading.set(true);
    this.booksService.getBookById(this.bookId).pipe(take(1)).subscribe({
      next: (book) => {
        this.book.set(book);
        this.bookEditForm.patchValue({
          title: book.title,
          description: book.description,
        });
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching book:', err);
        this.error.set('No se pudo cargar el libro');
        this.loading.set(false);
      }
    });
  }

  public bookEdit(): void {
    if (this.bookEditForm.invalid) {
      this.bookEditForm.markAllAsTouched();
      this.error.set('Formulario inválido');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.success.set(null);

    // ⚠️ Aquí deberías implementar el update en el backend
    const payload = {
      title: this.bookEditForm.value.title,
      description: this.bookEditForm.value.description,
    };

    console.log('Payload listo para enviar:', payload);


  }
}
