import { Component, inject, input, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { BooksService } from '@features/dashboard/services/books.service';
import { Blog } from '@features/editor/entities/interfaces/blogs.interface';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { ContentChange, QuillModule } from 'ngx-quill';
import { Delta } from 'quill';
import { BookResponse } from '../../../dashboard/entities/interfaces/books.interface';

@Component({
  selector: 'app-text-editor',
  imports: [ReactiveFormsModule, QuillModule, InputErrorsComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {

  private readonly fb = inject(FormBuilder);
  private readonly booksService = inject(BooksService);
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);

  public book = input<BookResponse | null>()

  public editorForm!: FormGroup;
  public blog = signal<Blog>({ title: '', editor: new Delta() });
  public htmleditor = signal<string>('');
  public deltaContent = signal<Delta | null>(null);
  public createdBook = signal<any | null>(null);

  public ngOnInit(): void {
    this.editorForm = this.fb.group({
      title: ['', [Validators.required]],
      editor: ['', [Validators.required]],
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book()) {
      const bookData = this.book();
      console.log('📖 Libro recibido en editor:', bookData);

      if (
        bookData?.chapters?.length &&
        bookData.chapters[0]?.pages?.length
      ) {
        const pageContent = bookData.chapters[0].pages[0].content || '';

        this.editorForm.patchValue({
          title: bookData.title,
          editor: pageContent
        });
      }
    }
  }



  public modulesQuill = {
    toolbar: true,
  };

  public editor(): void {
    const delta = this.deltaContent();
    if (this.editorForm.valid && delta) {
      const { title } = this.editorForm.value;

      // Convertimos el Delta a texto plano
      const plainText = delta.ops
        .map(op => typeof op.insert === 'string' ? op.insert : '')
        .join('');

      // ⚡️ Adaptamos al formato esperado por el backend
      const payload = {
        title,
        author: 'string',
        description: plainText + ' descripcion de prueba',
        tags: [],
        chapters: [
          {
            title: 'Capítulo 1',
            order: 1,
            pages: [
              {
                order: 1,
                content: plainText // 👈 aquí va lo que escribiste
              },
            ],
          },
        ],
      };

      this.booksService.createBook(payload).subscribe({
        next: (res) => {
          this.createdBook.set(res);
          console.log('✅ Libro creado:', res);

          const currentBooks = this.dataService.books();
          if (currentBooks) {
            this.dataService.books.set({
              ...currentBooks,
              results: [res, ...currentBooks.results],
              count: currentBooks.count + 1
            });
          } else {
            this.dataService.books.set({
              results: [res],
              count: 1,
              pages: 1,
              page: 1,
              page_size: 1,
              has_next: false,
              has_previous: false
            });
          }

          this.router.navigate(['/dashboard/profile']);
        },
        error: (err) => {
          console.error('❌ Error:', err);
        },
      });

    } else {
      this.editorForm.markAllAsTouched();
      console.error('Formulario inválido o contenido vacío');
    }
  }


  public onChangeEditor(event: ContentChange): void {
    const fullDelta: Delta = event.editor.getContents();
    this.deltaContent.set(fullDelta);
  }

}

