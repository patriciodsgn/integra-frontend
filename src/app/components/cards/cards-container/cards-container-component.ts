import { Component, Input } from '@angular/core';
import { CardData } from '../models/card.interface';

@Component({
    selector: 'app-cards-container',
    templateUrl: './cards-container.component.html',
    styleUrls: ['./cards-container.component.scss']
})
export class CardsContainerComponent {
    @Input() cards: CardData[] = [];
    @Input() headerTitle: string = '';
    @Input() headerSubtitle: string = '';
    @Input() containerClass: string = 'p-2 shadow-md rounded-lg bg-pink-200 text-black mb-4 w-full';
    @Input() containerBackgroundColor: string = '#fce7f3';
    @Input() defaultCardColor: string = '#e0b0ff';
}
