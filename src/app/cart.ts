import { computed, Injectable, signal } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({ providedIn: 'root' })
export class Cart {
  private _recipes = signal<Recipe[]>([]);

  recipes = this._recipes.asReadonly();

  count = computed(() => this._recipes().length);

  addRecipe(recipe: Recipe) {
    if (!this.canAddRecipe(recipe)) {
      throw new Error('Recipe already in cart');
    }

    this._recipes.update((recipes) => [...recipes, recipe]);
  }

  canAddRecipe(recipe: Recipe) {
    return this._recipes().every((r) => r.id !== recipe.id);
  }
}
