import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Cart } from './cart';
import { createRecipe, Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-search',
  imports: [RecipePreview],
  template: `
    @for(item of recipesWithCartInfo(); track item.recipe.id) {
    <app-recipe-preview [recipe]="item.recipe">
      <button [disabled]="!item.canAdd" (click)="addToCart(item.recipe)">
        ADD
      </button>
    </app-recipe-preview>
    }
  `,
})
export class RecipeSearch {
  private _recipeRepository = inject(RecipeRepository);
  protected recipes = toSignal<Recipe[]>(this._recipeRepository.getRecipes());
  protected recipesWithCartInfo = () => {
    return this.recipes()?.map((recipe) => ({
      recipe,
      canAdd: this._cart.canAddRecipe(recipe),
    }));
  };
  private _cart = inject(Cart);

  protected addToCart(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }
}

interface RecipeListDto {
  items: Array<{
    id: string;
    created_at: string;
    name: string;
    picture_uri: string;
  }>;
}
