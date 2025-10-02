import { Injectable, Provider } from '@angular/core';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import { defer, delay, Observable, of } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository, RecipeRepositoryDef } from './recipe-repository';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepositoryFake implements RecipeRepositoryDef {
  private _recipes: Recipe[] = [];

  private _pausedPromise = Promise.resolve();
  private _pausedPromiseResolver?: () => void;

  pause() {
    this._pausedPromise = new Promise((resolve) => {
      this._pausedPromiseResolver = resolve;
    });
  }

  resume() {
    this._pausedPromiseResolver?.();
  }

  search({
    keywords,
    maxIngredientCount,
    maxStepCount,
  }: RecipeFilterCriteria = {}): Observable<Recipe[]> {
    return defer(async () => {
      await this._pausedPromise;
      const recipes = this._recipes.filter((recipe) => {
        const conditions = [
          /* Filter by keywords. */
          () => (keywords ? recipe.name.includes(keywords) : true),
          /* Filter by max ingredients. */
          () =>
            maxIngredientCount != null
              ? recipe.ingredients.length <= maxIngredientCount
              : true,
          /* Filter by max steps. */
          () =>
            maxStepCount != null ? recipe.steps.length <= maxStepCount : true,
        ];

        /* Return true if all conditions are true. */
        return conditions.every((condition) => condition());
      });
      return recipes;
    });
  }

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
  }
}

export function provideRecipeRepositoryFake(): Provider[] {
  return [
    RecipeRepositoryFake,
    {
      provide: RecipeRepository,
      useExisting: RecipeRepositoryFake,
    },
  ];
}
