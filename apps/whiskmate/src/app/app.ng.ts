import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartDetail } from './cart-detail.ng';
import { RecipeSearch } from './recipe-search.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RecipeSearch, CartDetail],
  template: `
    <app-recipe-search />
    <hr />
    <app-cart-detail />
  `,
})
export class App {}
