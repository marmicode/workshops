import { Component, effect, viewChild } from '@angular/core';
import { Rating } from './rating.ng';
import { Dynamic } from './dynamic';

@Component({
  selector: 'app-root',
  imports: [Rating, Dynamic],
  template: `
    <app-rating />
    <hr />
    <app-dynamic />
  `,
})
export class App {}
