import { Injectable, signal } from '@angular/core';
import type { Recipe } from '../recipe/recipe';

@Injectable({ providedIn: 'root' })
export class MealPlanStore {
  private _meals = signal<Recipe[]>([]);
  meals = this._meals.asReadonly();

  add(recipe: Recipe): void {
    if (this.canAddMeal(recipe)) {
      this._meals.update((meals) => [...meals, recipe]);
    }
  }

  remove(recipe: Recipe): void {
    this._meals.update((meals) => meals.filter((m) => m.id !== recipe.id));
  }

  canAddMeal(recipe: Recipe): boolean {
    return !this._meals().some((m) => m.id === recipe.id);
  }
}
