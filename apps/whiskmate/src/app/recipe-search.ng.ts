import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cart } from './cart';
import { Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';
import { marmicodeResource } from './util/resource';

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
  private _recipeRepository = inject(RecipeRepository);
  protected recipes = marmicodeResource(() =>
    this._recipeRepository.getRecipes(),
  );
  protected recipesWithCartInfo = () => {
    return this.recipes.value()?.map((recipe) => ({
      recipe,
      canAdd: this._cart.canAddRecipe(recipe),
    }));
  };
  private _cart = inject(Cart);

  protected addToCart(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }
}
