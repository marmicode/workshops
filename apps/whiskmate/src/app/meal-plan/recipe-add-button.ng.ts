import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import type { Recipe } from '../recipe/recipe';
import { MealPlanStore } from './meal-plan-store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-add-button',
  imports: [MatButtonModule],
  template: `
    <button mat-raised-button [disabled]="!canAdd()" (click)="addRecipe()">
      ADD
    </button>
  `,
})
export class RecipeAddButton {
  recipe = input.required<Recipe>();

  protected canAdd = computed(() =>
    this._mealPlanStore.canAddMeal(this.recipe()),
  );

  private _mealPlanStore = inject(MealPlanStore);

  protected addRecipe(): void {
    this._mealPlanStore.add(this.recipe());
  }
}
