import { ChangeDetectionStrategy, Component, ElementRef, effect, model, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-input',
  imports: [FormsModule],
  template: `
    <button (click)="toggle()">TOGGLE</button>
    @if(isInputDisplayed()) {
      <input
        #input
        [ngModel]="value()"
        (ngModelChange)="value.set($event)"/>
    }
   `
})
export class InputComponent {
  value = model.required<string>();
  inputEl = viewChild('input', {
    read: ElementRef
  });
  isInputDisplayed = signal(true);

  constructor() {
    effect(() => {
      console.log(this.inputEl()?.nativeElement.outerHTML);
    });
  }

  toggle() {
    this.isInputDisplayed.update(displayed => !displayed);
  }
}
