import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidePanelComponent } from '@features/editor/components/side-panel/side-panel.component';
import { TextEditorComponent } from '@features/editor/components/text-editor/text-editor.component';
import { TopicPanelComponent } from '@features/editor/components/topic-panel/topic-panel.component';
import { WorkspaceService } from '@features/editor/services/workspace.service';

@Component({
  selector: 'app-workspace-page',
  imports: [TextEditorComponent, SidePanelComponent, CommonModule, TopicPanelComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.scss'
})
export class WorkspacePageComponent {

  private readonly workspace = inject(WorkspaceService);

  public selectedOption = this.workspace.selectedOption;
  public isManuscrito = this.workspace.isManuscrito;

}
