import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, EventEmitter, input, OnDestroy, OnInit, output, Output, signal } from '@angular/core';
import { Menu } from '@features/editor/entities/enums/menu.enum';
import { MenuItem, OptionSelected } from '@features/editor/entities/interfaces/side-panel.interface';

@Component({
  selector: 'app-side-panel',
  imports: [CommonModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent implements OnInit, OnDestroy {

  public initialSelection = input<OptionSelected | undefined>(undefined);
  public optionSelected = output<OptionSelected>();

  public isOpen = signal(false);
  public selectedMenu = signal<MenuItem | null>(null);
  public selectedOption = signal<string | null>(null);
  public activeMenu = signal<Menu | null>(null);

  public selectedMenuLabel = computed(() => this.selectedMenu()?.label ?? '');
  public selectedMenuIcon = computed(() => this.selectedMenu()?.icon ?? '');

  public menuItems: MenuItem[] = [
    { icon: 'menu-book.png', label: Menu.Manuscrito, options: ['Libro', 'Capítulos'] },
    { icon: 'menu-history.png', label: Menu.Historia, options: ['Cronología', 'Eventos'] },
    { icon: 'menu-characters.png', label: Menu.Personajes, options: ['Héroes', 'Villanos'] },
    { icon: 'menu-locations.png', label: Menu.Localizaciones, options: ['Lugares', 'Mapas'] },
  ];

  public constructor(private readonly elRef: ElementRef) { }

  public ngOnInit(): void {
    if (this.initialSelection()) {
      this.selectedOption.set(this.initialSelection()?.option ?? null);
      this.activeMenu.set(this.initialSelection()?.menu ?? null);
    }
    document.addEventListener('click', this.handleClickOutside, true);
  }

  public ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  private handleClickOutside = (event: MouseEvent): void => {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen()) {
      this.togglePanel();
    }
  };

  public togglePanel(): void {
    const newState = !this.isOpen();
    this.isOpen.set(newState);

    if (!newState) {
      // Si cierro sin seleccionar nueva opción => restauro el menú real activo
      if (this.selectedOption()) {
        const menu = this.menuItems.find(m => m.options.includes(this.selectedOption()!));
        this.activeMenu.set(menu?.label ?? null);
      }
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
      // Mientras está abierto, que el feedback visual se pase aquí
      this.activeMenu.set(menu.label);
    }
  }

  public selectOption(menu: Menu, option: string, icon: string): void {
    this.selectedOption.set(option);
    this.activeMenu.set(menu); // Aquí sí se queda persistente
    this.optionSelected.emit({ menu, option, icon });
  }

}
