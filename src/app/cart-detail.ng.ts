import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Cart } from './cart';
import { RecipePreview } from './recipe-preview.ng';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart-detail',
  imports: [RecipePreview],
  template: `
    @for (recipe of cart.recipes(); track recipe.id) {
      <app-recipe-preview [recipe]="recipe" />
    }
  `,
})
export class CartDetail {
  protected cart = inject(Cart);
}
