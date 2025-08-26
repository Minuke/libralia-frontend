import { Injectable, signal, computed } from "@angular/core";
import { Menu } from "../entities/enums/menu.enum";
import { MenuItem, OptionSelected } from "../entities/interfaces/side-panel.interface";

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  public readonly selectedOption = signal<OptionSelected>({
    menu: Menu.Manuscrito,
    option: 'Libro',
    icon: 'menu-book.png',
  });

  public readonly isPanelOpen = signal(false);
  public readonly selectedMenu = signal<MenuItem | null>(null);
  public readonly activeMenu = signal<Menu>(Menu.Manuscrito);

  public readonly isManuscrito = computed(() => this.selectedOption().menu === Menu.Manuscrito);

  public togglePanel(): void {
    const newState = !this.isPanelOpen();
    this.isPanelOpen.set(newState);

    if (!newState) {
      this.activeMenu.set(this.selectedOption().menu);
      this.selectedMenu.set(null);
    } else {
      if (!this.selectedMenu()) {
        this.selectedMenu.set({
          label: this.selectedOption().menu,
          icon: this.selectedOption().icon,
          options: []
        });
      }
    }
  }

  public selectMenu(menu: MenuItem): void {
    if (this.selectedMenu()?.label === menu.label) {
      this.selectedMenu.set(null);
      this.isPanelOpen.set(false);
    } else {
      this.selectedMenu.set(menu);
      this.isPanelOpen.set(true);
      this.activeMenu.set(menu.label);
    }
  }

  public selectOption(menu: Menu, option: string, icon: string): void {
    this.selectedOption.set({ menu, option, icon });
    this.activeMenu.set(menu);
  }
}
