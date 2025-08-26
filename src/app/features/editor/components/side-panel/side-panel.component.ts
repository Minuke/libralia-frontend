import { Component, ElementRef, inject, OnDestroy, OnInit } from '@angular/core';
import { Menu } from '@features/editor/entities/enums/menu.enum';
import { MenuItem } from '@features/editor/entities/interfaces/side-panel.interface';
import { SidePanelService } from '@features/editor/services/side-panel.service';


@Component({
  selector: 'app-side-panel',
  imports: [],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent implements OnInit, OnDestroy {

  private readonly sidePanelService = inject(SidePanelService);
  private readonly elRef = inject(ElementRef);

  public menuItems = this.sidePanelService.menuItems;
  public isOpen = this.sidePanelService.isPanelOpen;
  public selectedMenu = this.sidePanelService.selectedMenu;
  public selectedOption = this.sidePanelService.selectedOption;
  public activeMenu = this.sidePanelService.activeMenu;

  public ngOnInit(): void {
    document.addEventListener('click', this.handleClickOutside, true);
    console.log(this.isOpen())
  }

  private handleClickOutside = (event: MouseEvent) => {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen()) {
      this.sidePanelService.togglePanel();
    }
  };

  public togglePanel(): void {
    this.sidePanelService.togglePanel();
  }

  public selectMenu(menu: MenuItem): void {
    this.sidePanelService.selectMenu(menu);
  }

  public selectOption(menuLabel: Menu | undefined, option: string, icon: string): void {
    if (menuLabel) {
      this.sidePanelService.selectOption(menuLabel, option, icon);
    }
  }

  public ngOnDestroy(): void {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

}