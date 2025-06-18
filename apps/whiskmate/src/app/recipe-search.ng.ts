import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map } from 'rxjs';
import { Cart } from './cart';
import { createRecipe, Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

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
  protected recipes = rxResource({
    stream: () => this._recipeRepository.getRecipes(),
  });
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

interface RecipeListDto {
  items: Array<{
    id: string;
    created_at: string;
    name: string;
    picture_uri: string;
  }>;
}
