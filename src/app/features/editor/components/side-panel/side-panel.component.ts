import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, input, output, Output, signal } from '@angular/core';
import { Menu } from '@features/editor/entities/enums/menu.enum';
import { MenuItem, OptionSelected } from '@features/editor/entities/interfaces/side-panel.interface';

@Component({
  selector: 'app-side-panel',
  imports: [CommonModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {

  public initialSelection = input<OptionSelected | undefined>(undefined);
  public optionSelected = output<OptionSelected>();

  public isOpen = signal(false);
  public selectedMenu = signal<MenuItem | null>(null);
  public selectedOption = signal<string | null>(null);

  public selectedMenuLabel = computed(() => this.selectedMenu()?.label ?? '');
  public selectedMenuIcon = computed(() => this.selectedMenu()?.icon ?? '');

  public menuItems: MenuItem[] = [
    { icon: 'menu-book.png', label: Menu.Manuscrito, options: ['Libro', 'Capítulos'] },
    { icon: 'menu-history.png', label: Menu.Historia, options: ['Cronología', 'Eventos'] },
    { icon: 'menu-characters.png', label: Menu.Personajes, options: ['Héroes', 'Villanos'] },
    { icon: 'menu-locations.png', label: Menu.Localizaciones, options: ['Lugares', 'Mapas'] },
  ];

  public ngOnInit(): void {
    if (this.initialSelection()) {
      this.selectedOption.set(this.initialSelection()?.option ?? null);
    }
  }

  public togglePanel(): void {
    const newState = !this.isOpen();
    this.isOpen.set(newState);

    if (!newState) {
      this.selectedMenu.set(null);
    } else if (!this.selectedMenu() && this.selectedOption()) {
      const menu = this.menuItems.find(m => m.options.includes(this.selectedOption()!));
      if (menu) {
        this.selectedMenu.set(menu);
      }
    }
  }

  public selectMenu(menu: MenuItem): void {
    if (this.selectedMenu()?.label === menu.label) {
      this.selectedMenu.set(null);
      this.isOpen.set(false);
    } else {
      this.selectedMenu.set(menu);
      this.isOpen.set(true);
    }
  }

  public selectOption(menu: Menu, option: string, icon: string): void {
    this.selectedOption.set(option);
    this.optionSelected.emit({ menu, option, icon });
  }
  
}
