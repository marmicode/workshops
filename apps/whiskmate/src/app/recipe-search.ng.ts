import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Cart } from './cart';
import { createRecipe, Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';

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
  protected recipes = signal<Recipe[]>([]);
  protected recipesWithCartInfo = () => {
    return this.recipes().map((recipe) => ({
      recipe,
      canAdd: this._cart.canAddRecipe(recipe),
    }));
  };
  private _cart = inject(Cart);
  private _http = inject(HttpClient);

  constructor() {
    /* DO NOT DO THIS IN REAL LIFE. */
    this._http
      .get<RecipeListDto>('https://recipes-api.marmicode.io/recipes')
      .subscribe((data) => {
        this.recipes.set(
          data.items.map((item) =>
            createRecipe({
              id: item.id,
              ingredients: [],
              instructions: [],
              name: item.name,
            })
          )
        );
      });
  }

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
