import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { createRecipe } from './recipe';
import { marmicodeResource } from './util/resource';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  private _http = inject(HttpClient);

  searchRecipes(keywords?: string | null) {
    let params = new HttpParams();

    if (keywords) {
      params = params.set('q', keywords);
    }

    return this._http
      .get<RecipeListDto>('https://recipes-api.marmicode.io/recipes', {
        params,
      })
      .pipe(
        map((data) =>
          data.items.map((item) =>
            createRecipe({
              id: item.id,
              ingredients: [],
              instructions: [],
              name: item.name,
            }),
          ),
        ),
      );
  }
}

export function createRecipesResource() {
  const repo = inject(RecipeRepository);
  return marmicodeResource(() => repo.searchRecipes());
}

interface RecipeListDto {
  items: Array<{
    id: string;
    created_at: string;
    name: string;
    picture_uri: string;
  }>;
}
