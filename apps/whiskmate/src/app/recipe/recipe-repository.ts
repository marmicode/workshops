import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { debounceTime, map, retry } from 'rxjs';
import { createRecipe } from '../recipe-shared/recipe';
import { marmicodeResource } from '../util/resource';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';

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

export function createRecipesResource(keywords?: Signal<string | null>) {
  const repo = inject(RecipeRepository);
  return rxResource({
    params: debounceSignal(keywords ?? signal(null), 100),
    stream: ({ params }) => repo.searchRecipes(params).pipe(retry(3)),
  });
}

/* TODO: move this to util. */
function debounceSignal<T>(signal: Signal<T>, delay: number) {
  return toSignal(toObservable(signal).pipe(debounceTime(delay)));
}

interface RecipeListDto {
  items: Array<{
    id: string;
    created_at: string;
    name: string;
    picture_uri: string;
  }>;
}
