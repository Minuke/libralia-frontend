import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Blog } from '@features/editor/entities/blogs.interface';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { ContentChange, QuillModule } from 'ngx-quill';
import { Delta } from 'quill';

@Component({
  selector: 'app-text-editor',
  imports: [ReactiveFormsModule, QuillModule, InputErrorsComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {

  private readonly fb = inject(FormBuilder);

  public editorForm!: FormGroup;
  public blog = signal<Blog>({ title: '', contento: new Delta() });
  public htmlcontento = signal<string>('');
  public deltaContent = signal<Delta | null>(null);

  public ngOnInit(): void {
    this.editorForm = this.fb.group({
      title: ['', [Validators.required]],
      contento: ['', [Validators.required]],
    });
  }

  public modulesQuill = {
    toolbar: true,
  };

  public editor(): void {
    const delta = this.deltaContent();
    if (this.editorForm.valid && delta) {
      const editor: Blog = {
        title: this.editorForm.value.title,
        contento: delta
      };
      console.log('Editor guardado:', editor);
    } else {
      this.editorForm.markAllAsTouched();
      console.error("Editor inválido o contenido vacío");
    }
  }

  public onChangeEditor(event: ContentChange): void {
    const fullDelta: Delta = event.editor.getContents();
    this.deltaContent.set(fullDelta);
  }

}

