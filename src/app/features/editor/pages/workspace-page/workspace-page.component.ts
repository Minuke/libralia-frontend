import { Component } from '@angular/core';
import { SidePanelComponent } from '@features/editor/components/side-panel/side-panel.component';
import { TextEditorComponent } from '@features/editor/components/text-editor/text-editor.component';

@Component({
  selector: 'app-workspace-page',
  imports: [TextEditorComponent, SidePanelComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.scss'
})
export class WorkspacePageComponent {

}
