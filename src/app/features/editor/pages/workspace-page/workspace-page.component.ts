import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SidePanelComponent } from '@features/editor/components/side-panel/side-panel.component';
import { TextEditorComponent } from '@features/editor/components/text-editor/text-editor.component';
import { TopicPanelComponent } from '@features/editor/components/topic-panel/topic-panel.component';

@Component({
  selector: 'app-workspace-page',
  imports: [TextEditorComponent, SidePanelComponent, CommonModule, TopicPanelComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.scss'
})
export class WorkspacePageComponent {
  
  public selectedOption = signal<{ menu: string, option: string, icon: string }>({
    menu: 'Manuscrito',
    option: 'Libro',
    icon: 'menu-book.png'
  });

  public onOptionSelected(selection: { menu: string, option: string, icon: string }) {
    this.selectedOption.set(selection);
    console.log('Opción seleccionada:', this.selectedOption());
  }

}
