import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FeatureToggles {
  private readonly recipeSearch = signal(
    localStorage.getItem('recipe-search') === 'true',
  );

  canSearchRecipes(): boolean {
    return this.recipeSearch();
  }

  setRecipeSearchEnabled(enabled: boolean): void {
    this.recipeSearch.set(enabled);
    localStorage.setItem('recipe-search', String(enabled));
  }
}
