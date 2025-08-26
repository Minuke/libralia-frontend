import { Injectable, signal, computed } from '@angular/core';
import { Menu } from '../entities/enums/menu.enum';
import { MenuItem, OptionSelected } from '../entities/interfaces/side-panel.interface';

@Injectable({
  providedIn: 'root',
})
export class SidePanelService {

  private readonly _selectedOption = signal<OptionSelected>({
    menu: Menu.Manuscrito,
    option: 'Libro',
    icon: 'menu-book.png',
  });

  private readonly _isPanelOpen = signal(false);
  private readonly _activeMenu = signal<Menu>(Menu.Manuscrito);

  public readonly menuItems: MenuItem[] = [
    { icon: 'menu-book.png', label: Menu.Manuscrito, options: ['Libro', 'Capítulos'] },
    { icon: 'menu-history.png', label: Menu.Historia, options: ['Cronología', 'Eventos'] },
    { icon: 'menu-characters.png', label: Menu.Personajes, options: ['Héroes', 'Villanos'] },
    { icon: 'menu-locations.png', label: Menu.Localizaciones, options: ['Lugares', 'Mapas'] },
  ];

  public readonly selectedOption = computed(() => this._selectedOption());
  public readonly isPanelOpen = computed(() => this._isPanelOpen());

  public readonly activeMenu = computed(() => {
    return this._isPanelOpen()
      ? this._activeMenu()
      : this._selectedOption().menu;
  });

  public readonly selectedMenu = computed<MenuItem | null>(() => {
    const menuLabel = this._isPanelOpen()
      ? this._activeMenu()
      : this._selectedOption().menu;

    return this.menuItems.find(m => m.label === menuLabel) ?? null;
  });

  public readonly isManuscrito = computed(
    () => this._selectedOption().menu === Menu.Manuscrito,
  );

  public togglePanel(): void {
    const opening = !this._isPanelOpen();
    this._isPanelOpen.set(opening);

    if (opening) {
      this._activeMenu.set(this._selectedOption().menu);
    }
  }

  public selectMenu(menu: MenuItem): void {
    if (this._activeMenu() === menu.label && this._isPanelOpen()) {
      this._isPanelOpen.set(false);
      return;
    }
    this._activeMenu.set(menu.label);
    this._isPanelOpen.set(true);
  }

  public selectOption(menu: Menu, option: string, icon: string): void {
    this._selectedOption.set({ menu, option, icon });
    this._activeMenu.set(menu);
    this._isPanelOpen.set(true);
  }
}
