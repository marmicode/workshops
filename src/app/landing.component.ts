import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InputComponent } from './input.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-landing',
  imports: [InputComponent],
  template: `
  <app-input [value]="value()" (valueChange)="value.set($event)"/>
  <app-input [(value)]="value"/>
  {{ value()}}
  `
})
export class LandingComponent {
  value = signal('test');
}
