import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Blog } from '@features/editor/entities/blogs.interface';
import { InputErrorsComponent } from '@shared/components/input-errors/input-errors.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-text-editor',
  imports: [ReactiveFormsModule, QuillModule, InputErrorsComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss'
})
export class TextEditorComponent {

  private readonly fb = inject(FormBuilder);

  public editorForm!: FormGroup;
  public blog = signal<Blog>({ title: '', contento: '' });
  public htmlcontento = signal<string>('');

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
    if (this.editorForm.valid) {
      const editor: Blog = this.editorForm.value;
      console.log("Editor guardado:", editor);
    } else {
      this.editorForm.markAllAsTouched();
      console.error("Editor inválido");
    }
  }

  public onChangeEditor(event: any): void {
    if (event.html) {
      this.htmlcontento.set(event.html);
    }
  }

}

