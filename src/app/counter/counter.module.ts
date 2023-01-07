import {NgModule} from '@angular/core';
import {CounterComponent} from './counter/counter.component';
import {CommonModule} from '@angular/common';
import {CounterOutputComponent} from './counter-output/counter-output.component';
import {CounterButtonsComponent} from './counter-buttons/counter-buttons.component';
import {CustomCounterInputComponent} from './custom-counter-input/custom-counter-input.component';
import {FormsModule} from '@angular/forms';
import {CounterRoutingModule} from './counter-routing.module';

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent
  ],
  imports: [
    CommonModule,
    CounterRoutingModule,
    FormsModule
  ]
})
export class CounterModule {}
