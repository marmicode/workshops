import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, retry, Subject, switchMap } from 'rxjs';
import { Cart } from './cart';
import { Recipe } from './recipe';
import { RecipeForm } from './recipe-filter-form.ng';
import { RecipePreview } from './recipe-preview.ng';
import { createRecipesResource, RecipeRepository } from './recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-search',
  imports: [RecipePreview, RecipeForm],
  template: `
    <app-recipe-filter-form [(keywords)]="keywords" />

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
            <button
              [disabled]="!item.canAdd"
              (click)="cart.addRecipe(item.recipe)"
            >
              ADD
            </button>
          </app-recipe-preview>
        }
      </section>
    }

    @if (recipes.hasValue() && recipes.value().length > 3) {
      <app-recipe-filter-form [(keywords)]="keywords" />
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
  protected keywords = signal<string | null>(null);
  protected cart = inject(Cart);
  protected recipes = createRecipesResource(this.keywords);
  protected recipesWithCartInfo = mergeRecipesWithCartInfo(this.recipes.value);

  /* Basic version. */
  // protected recipes = rxResource({
  //   params: this.keywords,
  //   stream: ({ params }) => this._repo.searchRecipes(params),
  // });

  /* Debounce with: Signal/Resource based + RxJS islands. */
  // protected debouncedKeywords = toSignal(
  //   toObservable(this.keywords).pipe(debounceTime(100)),
  // );
  // protected recipes = rxResource({
  //   params: this.debouncedKeywords,
  //   stream: ({ params }) => this._repo.searchRecipes(params).pipe(retry(3)),
  // });

  /* Debounce with RxJS island. */
  // protected keywords$ = toObservable(this.keywords);
  // protected recipes = rxResource({
  //   stream: () =>
  //     this.keywords$.pipe(
  //       debounceTime(100),
  //       switchMap((keywords) =>
  //         this._repo.searchRecipes(keywords).pipe(retry(3)),
  //       ),
  //     ),
  // });
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
