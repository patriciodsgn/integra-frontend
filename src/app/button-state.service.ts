import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ButtonStateService {
  private activeButtonIndex = signal<number | null>(null); // Usa signals de Angular 18

  setActiveButton(index: number | null): void {
    this.activeButtonIndex.set(index);
  }

  activeButton(): number | null {
    return this.activeButtonIndex();
  }
}
