import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { createRecipe, Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  private _http = inject(HttpClient);

  searchRecipes(): Observable<Recipe[]> {
    return this._http
      .get<RecipesResponse>('https://recipe-api.marmicode.io/recipes')
      .pipe(
        map((response) => {
          return response.items.map((recipe) => {
            return createRecipe({
              id: recipe.id,
              name: recipe.name,
              ingredients: [],
              instructions: [],
            });
          });
        }),
      );
  }
}

interface RecipesResponse {
  items: RecipeResponseItem[];
}

interface RecipeResponseItem {
  id: string;
  name: string;
  picture_uri: string;
}
