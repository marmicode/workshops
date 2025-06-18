import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { suspensify } from '@jscutlery/operators';
import { Cart } from './cart';
import { Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-search',
  imports: [RecipePreview],
  template: `
    @if (recipes()?.pending) {
      <div>Loading...</div>
    }

    @if (recipes()?.hasError) {
      <div>Oups! Something went wrong.</div>
    }

    @if (recipes()?.hasValue) {
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
  protected recipes = toSignal(
    this._recipeRepository.getRecipes().pipe(suspensify()),
  );
  protected recipesWithCartInfo = () => {
    const suspense = this.recipes();
    if (!suspense?.hasValue) {
      return [];
    }
    return suspense.value.map((recipe) => ({
      recipe,
      canAdd: this._cart.canAddRecipe(recipe),
    }));
  };
  private _cart = inject(Cart);

  protected addToCart(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }
}
