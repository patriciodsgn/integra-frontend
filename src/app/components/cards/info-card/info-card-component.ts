import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'app-info-card',
    templateUrl: 'info-card.component.html',
    styleUrls: []
})
export class InfoCardComponent {
    @Input() icon!: IconDefinition;
    @Input() title: string = '';
    @Input() value: number = 0;
    @Input() backgroundColor: string = '#e0b0ff';
}
