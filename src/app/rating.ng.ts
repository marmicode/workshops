import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: `
    <button [disabled]="!canDecrement()" (click)="decrement()">👎</button>
    <button [disabled]="!canIncrement()" (click)="increment()">👍</button>
    @for(option of scoreOptions; track option) {
    <button (click)="score.set(option.value)">{{ option.label }}</button>
    }
    <p [class.good]="score() > 3" [style.fontSize.px]="12 + score() * 3">
      Score: {{ score() }}
    </p>
  `,
  styles: `
    button { border: 1px solid black; }
    .good { color: green; }
  `,
})
export class Rating {
  protected score = signal(3);
  protected canDecrement = computed(() => this.score() > 0);
  protected canIncrement = computed(() => this.score() < 5);
  protected scoreOptions = [
    {
      value: 0,
      label: 'Bad',
    },
    {
      value: 3,
      label: 'OK',
    },
    {
      value: 5,
      label: 'Great',
    },
  ];

  protected increment() {
    this.score.update((score) => score + 1);
  }

  protected decrement() {
    this.score.update((score) => score - 1);
  }
}
