import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { Menu } from '@features/editor/entities/enums/menu.enum';
import { MenuItem } from '@features/editor/entities/interfaces/side-panel.interface';
import { WorkspaceService } from '@features/editor/services/workspace.service';


@Component({
  selector: 'app-side-panel',
  imports: [],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent implements OnInit, OnDestroy {

  private readonly workspace = inject(WorkspaceService);
  private readonly elRef = inject(ElementRef);

  public menuItems: MenuItem[] = [
    { icon: 'menu-book.png', label: Menu.Manuscrito, options: ['Libro', 'Capítulos'] },
    { icon: 'menu-history.png', label: Menu.Historia, options: ['Cronología', 'Eventos'] },
    { icon: 'menu-characters.png', label: Menu.Personajes, options: ['Héroes', 'Villanos'] },
    { icon: 'menu-locations.png', label: Menu.Localizaciones, options: ['Lugares', 'Mapas'] },
  ];

  public isOpen = this.workspace.isPanelOpen;
  public selectedMenu = this.workspace.selectedMenu;
  public selectedOption = this.workspace.selectedOption;
  public activeMenu = this.workspace.activeMenu;

  public ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  private handleClickOutside = (event: MouseEvent) => {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen()) {
      this.workspace.togglePanel();
    }
  };

  public togglePanel(): void {
    this.workspace.togglePanel();
  }

  public selectMenu(menu: MenuItem): void {
    this.workspace.selectMenu(menu);
  }

  public selectOption(menuLabel: Menu | undefined, option: string, icon: string): void {
    if (menuLabel) {
      this.workspace.selectOption(menuLabel, option, icon);
    }
  }

  public ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

}