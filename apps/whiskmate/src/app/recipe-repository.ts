import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { createRecipe, Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  private _http = inject(HttpClient);

  getRecipes(): Observable<Recipe[]> {
    return this._http
      .get<RecipeListDto>('https://recipes-api.marmicode.io/recipes')
      .pipe(
        map((data) =>
          data.items.map((item) =>
            createRecipe({
              id: item.id,
              ingredients: [],
              instructions: [],
              name: item.name,
            })
          )
        )
      );
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
