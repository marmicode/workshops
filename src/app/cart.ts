import { Recipe } from './recipe';

export class Cart {
  private _recipes: Recipe[] = [];

  addRecipe(recipe: Recipe) {
    if (!this.canAddRecipe(recipe)) {
      throw new Error('Recipe already in cart');
    }

    this._recipes.push(recipe);
  }

  canAddRecipe(recipe: Recipe) {
    return this._recipes.every((r) => r.id !== recipe.id);
  }

  getRecipes(): Recipe[] {
    return this._recipes;
  }
}
