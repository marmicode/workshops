import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cart } from './cart';
import { RecipePreview } from './recipe-preview.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-detail',
  imports: [RecipePreview],
  template: `
    @for (recipe of cart.recipes(); track recipe.id) {
      <app-recipe-preview [recipe]="recipe">
        <button (click)="cart.removeRecipe(recipe)">REMOVE</button>
      </app-recipe-preview>
    }
  `,
})
export class CartDetail {
  protected cart = inject(Cart);
}

export default CartDetail;
