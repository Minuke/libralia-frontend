import { Component, computed, input, Input } from '@angular/core';

@Component({
  selector: 'app-topic-panel',
  imports: [],
  templateUrl: './topic-panel.component.html',
  styleUrl: './topic-panel.component.scss'
})
export class TopicPanelComponent {
  public menu = input<string>('');
  public option = input<string>('');
  public icon = input<string>('');

  public iconPath = computed(() => {
    return `/images/${this.icon()}`;
  });

  public description = computed(() => {
    switch (this.menu()) {
      case 'Historia':
        return `Aquí podrás gestionar la ${this.option().toLowerCase()} de tu historia. Añade nuevos eventos, personajes o fechas clave para mantener un registro detallado de tu mundo.`;
      case 'Personajes':
        return `Esta sección te permite crear y editar ${this.option().toLowerCase()} para tu historia. Define sus motivaciones, arcos de personaje y roles en la trama.`;
      case 'Localizaciones':
        return `Explora los ${this.option().toLowerCase()} de tu mundo. Crea mapas detallados, describe los puntos de interés y da vida a los escenarios de tu historia.`;
      case 'Manuscrito':
        if (this.option() === 'Capítulos') {
          return 'Aquí puedes gestionar los capítulos de tu manuscrito, organizarlos y añadir contenido a cada uno.';
        }
        return '';
      default:
        return 'Selecciona una opción del menú para comenzar a editar.';
    }
  });

}
