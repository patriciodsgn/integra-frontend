import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ButtonStateService {
  // Signal para el índice del botón activo
  activeButton = signal<number | null>(null);

  // Método para establecer el botón activo
  setActiveButton(index: number) {
    this.activeButton.set(index);
  }

  // Método para resetear el botón activo
  resetActiveButton() {
    this.activeButton.set(null);
  }
}
