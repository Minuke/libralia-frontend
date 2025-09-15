import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookResponse } from '@features/dashboard/entities/interfaces/books.interface';
import { BooksService } from '@features/dashboard/services/books.service';
import { minDescriptionLengthValidator } from '@features/dashboard/validators/min-description.validator';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { take } from 'rxjs';
import { DataService } from '../../../../core/services/data.service';

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
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  public bookEditForm!: FormGroup;
  public loading = signal(false);
  public error = signal<string | null>(null);
  public success = signal<string | null>(null);

  private bookId!: string;
  public book = signal<BookResponse | null>(null);

  public ngOnInit(): void {
    this.bookEditForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, minDescriptionLengthValidator(10)]],
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
    this.booksService.updateBook(this.bookId, payload).pipe(take(1)).subscribe({
      next: (updatedBook) => {
        this.loading.set(false);
        this.success.set('Libro actualizado correctamente ✅');
        this.book.set(updatedBook);
        this.dataService.updateBookInList(updatedBook);
        this.router.navigate(['/dashboard/profile']);
      },
      error: (err) => {
        this.loading.set(false);

        if (err.status === 400) {
          this.error.set('Error de negocio: ' + JSON.stringify(err.error.errors));
        } else if (err.status === 422) {
          this.error.set('Error de validación: ' + JSON.stringify(err.error));
        } else if (err.status === 404) {
          this.error.set('El libro no existe');
        } else {
          this.error.set('Error inesperado al actualizar el libro');
        }

        console.error('Book update error:', err);
      }
    });


  }
}
