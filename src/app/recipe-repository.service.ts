import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, lastValueFrom, map, Observable, retry } from 'rxjs';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  private _httpClient = inject(HttpClient);

  searchRecipes(keywords?: string): Observable<Recipe[]> {
    const params = keywords ? { q: keywords } : undefined;

    return this._httpClient
      .get<RecipesResponseDto>(`https://recipes-api.marmicode.io/recipes`, {
        params,
      })
      .pipe(
        map((data) =>
          data.items.map((item) => ({
            id: item.id,
            name: item.name,
            pictureUri: item.picture_uri,
          }))
        ),
        retry({
          delay: (_, retryCount) => interval(retryCount * 1000),
        })
      );
  }

  async searchRecipesV2(keywords?: string): Promise<Recipe[]> {
    const response = await lastValueFrom(
      this._httpClient.get<RecipesResponseDto>(
        `https://recipes-api.marmicode.io/recipes`,
        { params: keywords ? { q: keywords } : undefined }
      )
    );
    return response.items.map((item) => ({
      id: item.id,
      name: item.name,
      pictureUri: item.picture_uri,
    }));
  }
}

/*
 * Data transfer objects are defined manually here...
 * ... but could be generated automatically using openapi-generator.
 */
interface RecipesResponseDto {
  items: RecipeDto[];
}

interface RecipeDto {
  id: string;
  created_at: string;
  name: string;
  picture_uri: string;
}