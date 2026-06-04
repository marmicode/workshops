import { Injectable } from '@angular/core';
import type { MealSlot, PlannedMeal } from './meal-plan';
import type { Recipe } from '../recipe/recipe';

@Injectable({ providedIn: 'root' })
export class MealPlanStore {
  /**
   * @deprecated 🚧 work in progress
   */
  add(_args: { slot: MealSlot; recipe: Recipe }): void {
    throw new Error(`🚧 work in progress`);
  }

  /**
   * @deprecated 🚧 work in progress
   */
  has(_args: { slot: MealSlot; recipeId: string }): boolean {
    throw new Error(`🚧 work in progress`);
  }

  /**
   * @deprecated 🚧 work in progress
   */
  plannedMeals(): PlannedMeal[] {
    throw new Error(`🚧 work in progress`);
  }
}
