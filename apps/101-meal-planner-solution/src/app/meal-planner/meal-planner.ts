import { Injectable, signal } from '@angular/core';
import { Recipe } from '../recipe/recipe';

@Injectable({
  providedIn: 'root',
})
export class MealPlanner {
  private _recipes = signal<Recipe[]>([]);
  recipes = this._recipes.asReadonly();

  canAddRecipe(recipe: Recipe): boolean {
    return this.recipes().find((_recipe) => recipe.id === _recipe.id) == null;
  }

  addRecipe(recipe: Recipe) {
    if (!this.canAddRecipe(recipe)) {
      throw new Error(`Can't add recipe.`);
    }
    this._recipes.update((recipes) => [...recipes, recipe]);
  }
}
