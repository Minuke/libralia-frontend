import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  imports: [CommonModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
@Output() optionSelected = new EventEmitter<{ menu: string, option: string, icon: string }>();
  constructor() {
    this.optionSelected.emit({ 
      menu: this.selectedMenu.label, 
      option: this.selectedOption,
      icon: this.selectedMenu.icon
    });
  }

  public isOpen = false;


  public menuItems = [
    { icon: 'menu-book.png', label: 'Manuscrito', options: ['Libro', 'Capítulos'] },
    { icon: 'menu-history.png', label: 'History', options: ['Cronologia', 'Eventos'] },
    { icon: 'menu-characters.png', label: 'Characters', options: ['Héroes', 'Villanos'] },
    { icon: 'menu-locations.png', label: 'Locations', options: ['Lugares', 'Mapas'] },
  ];

  public selectedMenu: any = this.menuItems[0];
  public selectedOption: string = 'Libro';

  public togglePanel() {
    this.isOpen = !this.isOpen;
  }

  public selectMenu(item: any) {
    this.selectedMenu = item;
    if (!this.isOpen) {
      this.isOpen = true;
    }
  }

  public selectOption(menuLabel: string, optionLabel: string, menuIcon: string) {
    this.selectedOption = optionLabel;
    this.optionSelected.emit({ menu: menuLabel, option: optionLabel, icon: menuIcon });
  }
}
