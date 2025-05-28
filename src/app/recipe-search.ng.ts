import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Cart } from './cart';
import { Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-search',
  imports: [RecipePreview],
  template: `
    <p>Cart: {{ cartCount() }}</p>
    <hr />
    @for (recipe of recipesWithCanAdd(); track recipe.id) {
      {{ recipe.name }}
      <app-recipe-preview [recipe]="recipe">
        <button [disabled]="!recipe.canAdd" (click)="addRecipeToCart(recipe)">
          ADD
        </button>
      </app-recipe-preview>
    }
  `
})
export class RecipeSearch {
  protected cartCount = computed(() => this._cart.count());
  protected recipes: Signal<Recipe[] | undefined>;
  protected recipesWithCanAdd = computed(() => {
    return this.recipes()?.map((recipe) => ({
      ...recipe,
      canAdd: this._cart.canAddRecipe(recipe)
    }));
  });

  private _cart = inject(Cart);
  private _recipeRepository = inject(RecipeRepository);

  constructor() {
    this.recipes = toSignal(this._recipeRepository.searchRecipes());
  }

  addRecipeToCart(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }
}
