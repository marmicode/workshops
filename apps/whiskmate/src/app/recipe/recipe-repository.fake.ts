import { Injectable, Provider } from '@angular/core';
import { defer, Observable, of } from 'rxjs';
import { Recipe } from '../recipe-shared/recipe';
import { RecipeRepository } from './recipe-repository';

@Injectable()
export class RecipeRepositoryFake implements Public<RecipeRepository> {
  private _recipes: Recipe[] = [];

  configure({ recipes }: { recipes: Recipe[] }) {
    this._recipes = recipes;
  }

  searchRecipes(keywords: string | null | undefined): Observable<Recipe[]> {
    return defer(() => {
      let recipes = this._recipes;

      if (keywords) {
        recipes = recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(keywords.toLowerCase()),
        );
      }

      return of(recipes);
    });
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

type Public<T> = { [K in keyof T]: T[K] };
