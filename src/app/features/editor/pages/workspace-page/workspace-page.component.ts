import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SidePanelComponent } from '@features/editor/components/side-panel/side-panel.component';
import { TextEditorComponent } from '@features/editor/components/text-editor/text-editor.component';
import { TopicPanelComponent } from '@features/editor/components/topic-panel/topic-panel.component';
import { SidePanelService } from '@features/editor/services/side-panel.service';


@Component({
  selector: 'app-workspace-page',
  imports: [TextEditorComponent, SidePanelComponent, CommonModule, TopicPanelComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.scss'
})
export class WorkspacePageComponent {

  private readonly sidePanelService = inject(SidePanelService);

  public selectedOption = this.sidePanelService.selectedOption;
  public isManuscrito = this.sidePanelService.isManuscrito;

}
