import { Injectable } from '@angular/core';
import { mealSlotsEqual, type MealSlot, type PlannedMeal } from './meal-plan';
import type { Recipe } from '../recipe/recipe';

@Injectable({ providedIn: 'root' })
export class MealPlanStore {
  private _plannedMeals = new Set<PlannedMeal>();

  /**
   * @deprecated 🚧 Work in progress.
   */
  add(plannedMeal: PlannedMeal): void {
    const slotTaken = [...this._plannedMeals].some((existing) =>
      mealSlotsEqual(existing.slot, plannedMeal.slot),
    );
    if (slotTaken) {
      return;
    }
    this._plannedMeals.add(plannedMeal);
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
    return Array.from(this._plannedMeals);
  }
}
