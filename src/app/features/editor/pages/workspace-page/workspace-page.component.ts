import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { SidePanelComponent } from '@features/editor/components/side-panel/side-panel.component';
import { TextEditorComponent } from '@features/editor/components/text-editor/text-editor.component';
import { TopicPanelComponent } from '@features/editor/components/topic-panel/topic-panel.component';
import { Menu } from '@features/editor/entities/enums/menu.enum';
import { OptionSelected } from '@features/editor/entities/interfaces/side-panel.interface';

@Component({
  selector: 'app-workspace-page',
  imports: [TextEditorComponent, SidePanelComponent, CommonModule, TopicPanelComponent],
  templateUrl: './workspace-page.component.html',
  styleUrl: './workspace-page.component.scss'
})
export class WorkspacePageComponent {

  public selectedOption = signal<OptionSelected>({
    menu: Menu.Manuscrito,
    option: 'Libro',
    icon: 'menu-book.png',
  });

  public isManuscrito = computed(() => this.selectedOption().menu === Menu.Manuscrito);

  public onOptionSelected(selection: OptionSelected): void {
    this.selectedOption.set(selection);
  }

}
