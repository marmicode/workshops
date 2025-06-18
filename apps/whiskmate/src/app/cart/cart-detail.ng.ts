import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cart } from './cart';
import { RecipePreview } from '../recipe-shared/recipe-preview.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-detail',
  imports: [RecipePreview],
  template: `
    <h2>Cart</h2>
    @for (recipe of cart.recipes(); track recipe.id) {
      <app-recipe-preview [recipe]="recipe" />
    }
  `,
})
export class CartDetail {
  protected cart = inject(Cart);
}
