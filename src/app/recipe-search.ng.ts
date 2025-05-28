import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Cart } from './cart';
import { Recipe } from './recipe';
import { RecipeCriteria } from './recipe-criteria';
import { RecipeFilter } from './recipe-filter.ng';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-search',
  imports: [RecipePreview, RecipeFilter],
  template: `
    <p>Cart: {{ cartCount() }}</p>
    <hr />
    <app-recipe-filter (criteriaChange)="search($event)" />
    @if (recipes.isLoading()) {
      <p>Loading...</p>
    }
    @for (recipe of recipesWithCanAdd(); track recipe.id) {
      {{ recipe.name }}
      <app-recipe-preview [recipe]="recipe">
        <button [disabled]="!recipe.canAdd" (click)="addRecipeToCart(recipe)">
          ADD
        </button>
      </app-recipe-preview>
    }
  `,
})
export class RecipeSearch {
  protected cartCount = computed(() => this._cart.count());
  protected recipes = rxResource({
    request: () => this._criteria() ?? null,
    loader: ({ request }) => this._recipeRepository.searchRecipes(request),
  });
  protected recipesWithCanAdd = computed(() => {
    return this.recipes.value()?.map((recipe) => ({
      ...recipe,
      canAdd: this._cart.canAddRecipe(recipe),
    }));
  });

  private _cart = inject(Cart);
  private _recipeRepository = inject(RecipeRepository);
  private _criteria = signal<RecipeCriteria | undefined>(undefined);

  constructor() {
    // Before `resource` was introduced, we would use `toSignal` to convert an observable to a signal.
    // const criteria$ = toObservable(this._criteria);
    // const recipes$ = criteria$.pipe(
    //   switchMap((criteria) => this._recipeRepository.searchRecipes(criteria)),
    // );
    // this.recipes = toSignal(recipes$);
  }

  addRecipeToCart(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }

  search(criteria: RecipeCriteria) {
    this._criteria.set(criteria);
  }
}

export default RecipeSearch;
