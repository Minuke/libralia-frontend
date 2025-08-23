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

  // Usamos computed para derivar el valor de iconPath de forma reactiva
  public iconPath = computed(() => {
    return `/images/${this.icon()}`;
  });

  // Usamos computed para derivar la descripción de forma reactiva
  public description = computed(() => {
    switch (this.menu()) {
      case 'Manuscrito':
        return `En esta sección puedes gestionar el ${this.option().toLowerCase()} de tu obra. Añade capítulos, organiza el contenido y edita el texto para dar vida a tu historia.`;
      case 'History':
        return `Aquí podrás gestionar la ${this.option().toLowerCase()} de tu historia. Añade nuevos eventos, personajes o fechas clave para mantener un registro detallado de tu mundo.`;
      case 'Characters':
        return `Esta sección te permite crear y editar ${this.option().toLowerCase()} para tu historia. Define sus motivaciones, arcos de personaje y roles en la trama.`;
      case 'Locations':
        return `Explora los ${this.option().toLowerCase()} de tu mundo. Crea mapas detallados, describe los puntos de interés y da vida a los escenarios de tu historia.`;
      default:
        return 'Selecciona una opción del menú para comenzar a editar.';
    }
  });
}
