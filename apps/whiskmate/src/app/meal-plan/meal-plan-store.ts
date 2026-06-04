import { Injectable } from '@angular/core';
import type { PlannedMeal } from './meal-plan';

@Injectable({ providedIn: 'root' })
export class MealPlanStore {
  add(plannedMeal: PlannedMeal): void {
    void plannedMeal;
  }
}
