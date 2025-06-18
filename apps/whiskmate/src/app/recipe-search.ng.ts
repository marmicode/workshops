import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { Cart } from './cart';
import { Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';
import { createRecipesResource } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-search',
  imports: [RecipePreview],
  template: `
    @if (recipes.isLoading()) {
      <div>Loading...</div>
    }

    @if (recipes.error()) {
      <div>Oups! Something went wrong.</div>
      <button (click)="recipes.reload()">RELOAD</button>
    }

    @if (recipes.hasValue()) {
      <section class="recipes">
        @for (item of recipesWithCartInfo(); track item.recipe.id) {
          <app-recipe-preview [recipe]="item.recipe">
            <button [disabled]="!item.canAdd" (click)="addToCart(item.recipe)">
              ADD
            </button>
          </app-recipe-preview>
        }
      </section>
    }
  `,
  styles: `
    .recipes {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
  `,
})
export class RecipeSearch {
  protected recipes = createRecipesResource();
  protected recipesWithCartInfo = mergeRecipesWithCartInfo(this.recipes.value);

  private _cart = inject(Cart);

  protected addToCart(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }
}

/**
 * Handy computed signal factory that merges recipes with cart information.
 * Do not abuse this pattern.
 */
function mergeRecipesWithCartInfo(recipes: Signal<Recipe[] | undefined>) {
  const cart = inject(Cart);
  return computed(() => {
    return recipes()?.map((recipe) => ({
      recipe,
      canAdd: cart.canAddRecipe(recipe),
    }));
  });
}
