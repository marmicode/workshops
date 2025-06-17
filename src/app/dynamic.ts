import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  effect,
  input,
  inputBinding,
  InputSignal,
  signal,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-dynamic',
  imports: [NgComponentOutlet],
  template: `
    <button (click)="toggle()">TOGGLE</button>
    <button (click)="name.set('Jane')">CHANGE NAME</button>

    <!-- Declarative -->
    <hr />
    <ng-container
      *ngComponentOutlet="cmp(); inputs: { name: name() }"
    ></ng-container>

    <!-- Imperative -->
    <hr />
    <ng-container #outlet />
    <hr />
  `,
})
export class Dynamic {
  cmp = signal<Type<NamePreview>>(A);
  outlet = viewChild.required('outlet', {
    read: ViewContainerRef,
  });
  name = signal('John');

  constructor() {
    /*
     * This is the imperative approach.
     * Declarative approach does not need any of this.
     */
    effect((cleanUp) => {
      const component = this.outlet().createComponent(this.cmp(), {
        bindings: [inputBinding('name', this.name)],
      });
      cleanUp(() => {
        component.destroy();
      });
    });
  }

  toggle() {
    this.cmp.update((cmp) => (cmp === A ? B : A));
  }
}

interface NamePreview {
  name: InputSignal<string>;
}

@Component({
  selector: 'app-a',
  template: `<i>A {{ name() }}</i>`,
})
export class A implements NamePreview {
  name = input.required<string>();
}

@Component({
  selector: 'app-b',
  template: `<b>B {{ name() }}</b>`,
})
export class B implements NamePreview {
  name = input.required<string>();
}
