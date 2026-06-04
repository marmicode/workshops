import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MealPlanStore } from '../meal-plan/meal-plan-store';
import { MealSlotPickerDialog } from '../meal-plan/meal-slot-picker-dialog.ng';
import { formatMealSlot } from '../meal-plan/meal-plan';
import type { Recipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-add-button',
  template: `<button type="button" (click)="openSlotPicker()">Add</button>`,
})
export class RecipeAddButton {
  @Input({ required: true }) recipe!: Recipe;

  private _dialog = inject(MatDialog);
  private _mealPlanStore = inject(MealPlanStore);
  private _snackBar = inject(MatSnackBar);

  openSlotPicker() {
    const recipe = this.recipe;
    this._dialog
      .open(MealSlotPickerDialog)
      .afterClosed()
      .subscribe((slot) => {
        if (!slot) {
          return;
        }
        this._mealPlanStore.add({ slot, recipe });
        this._snackBar.open(`Added to ${formatMealSlot(slot)}`);
      });
  }
}
