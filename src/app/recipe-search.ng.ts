import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
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
  protected recipes: Signal<Recipe[] | undefined>;
  protected recipesWithCanAdd = computed(() => {
    return this.recipes()?.map((recipe) => ({
      ...recipe,
      canAdd: this._cart.canAddRecipe(recipe),
    }));
  });

  private _cart = inject(Cart);
  private _recipeRepository = inject(RecipeRepository);
  private _criteria = signal<RecipeCriteria | undefined>(undefined);

  constructor() {
    const criteria$ = toObservable(this._criteria);
    const recipes$ = criteria$.pipe(
      switchMap((criteria) => this._recipeRepository.searchRecipes(criteria)),
    );
    this.recipes = toSignal(recipes$);
  }

  addRecipeToCart(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }

  search(criteria: RecipeCriteria) {
    this._criteria.set(criteria);
  }
}
