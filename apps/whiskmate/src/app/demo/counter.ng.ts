import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-counter',
  template: `<button (click)="count.update(c => c + 1)">Increment</button>
    <span role="status" aria-live="polite">{{ count() }}</span>
    <button (click)="count.update(c => Math.max(c - 1, 0))">Decrement</button>`,
})
export class Counter {
  protected count = signal(0);
  protected Math = Math;
}
