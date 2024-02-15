import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, effect, inject, model, signal, viewChild } from '@angular/core';
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
    addDocumentListener('click', () => console.log('click'));
    setClass('my-class');
  }

  toggle() {
    this.isInputDisplayed.update(displayed => !displayed);
  }
}

function setClass(className: string) {
    inject(ElementRef).nativeElement.classList.add(className);
}

function addDocumentListener(eventName: 'click', cb: () => void) {
  const document = inject(DOCUMENT);
  const destroyRef = inject(DestroyRef);
  document.addEventListener(eventName, cb);
  destroyRef.onDestroy(() => document.removeEventListener(eventName, cb));
}