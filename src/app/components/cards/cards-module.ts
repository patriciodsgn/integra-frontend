import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfoCardComponent } from './info-card/info-card-component';
import { CardsContainerComponent } from './cards-container/cards-container-component';

@NgModule({
    declarations: [
        InfoCardComponent,
        CardsContainerComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        InfoCardComponent,
        CardsContainerComponent
    ]
})
export class CardsModule { }
