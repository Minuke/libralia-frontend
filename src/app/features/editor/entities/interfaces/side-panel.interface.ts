import { Menu } from "../enums/menu.enum";

export interface MenuItem {
  icon: string;
  label: Menu;
  options: string[];
}

export interface OptionSelected {
  menu: Menu;
  option: string;
  icon: string;
}
