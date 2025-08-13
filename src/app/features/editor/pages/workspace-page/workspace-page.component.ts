import { Component } from '@angular/core';
import { TextEditorComponent } from '@features/editor/components/text-editor/text-editor.component';

@Component({
  selector: 'app-workspace-page',
  imports: [TextEditorComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.scss'
})
export class WorkspacePageComponent {

}
