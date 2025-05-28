import { Component } from '@angular/core';
import { RecipeSearch } from './recipe-search.ng';
import { CartDetail } from './cart-detail.ng';

@Component({
  selector: 'app-root',
  imports: [RecipeSearch, CartDetail],
  template: `
    <app-recipe-search />
    <hr />
    <app-cart-detail />
  `,
})
export class AppComponent {}
