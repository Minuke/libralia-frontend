import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  imports: [CommonModule],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  isOpen = false;

  menuItems = [
    { icon: 'menu-book.png', label: 'Books', options: ['Chapters', 'Notes'] },
    { icon: 'menu-history.png', label: 'History', options: ['Timeline', 'Events'] },
    { icon: 'menu-characters.png', label: 'Characters', options: ['Heroes', 'Villains'] },
    { icon: 'menu-locations.png', label: 'Locations', options: ['Map', 'Places'] },
  ];

  selectedMenu: any = this.menuItems[0];

  togglePanel() {
    this.isOpen = !this.isOpen;
  }

  selectMenu(item: any) {
    this.selectedMenu = item;
    if (!this.isOpen) {
      this.isOpen = true; // abre panel si está cerrado
    }
  }
}
