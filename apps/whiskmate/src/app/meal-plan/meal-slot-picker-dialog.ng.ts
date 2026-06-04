import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  DAYS_OF_WEEK,
  formatDayOfWeek,
  MEAL_TYPES,
  type DayOfWeek,
  type MealSlot,
  type MealType,
} from './meal-plan';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-meal-slot-picker-dialog',
  template: `
    <div class="days">
      @for (day of days; track day) {
        <button type="button" (click)="selectDay(day)">
          {{ formatDayOfWeek(day) }}
        </button>
      }
    </div>
    <div class="meals">
      @for (meal of meals; track meal) {
        <button type="button" (click)="selectMeal(meal)">
          {{ meal }}
        </button>
      }
    </div>
    <button type="button" (click)="confirm()">Confirm</button>
  `,
  styles: `
    .days,
    .meals {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
  `,
})
export class MealSlotPickerDialog {
  private _dialogRef =
    inject<MatDialogRef<MealSlotPickerDialog, MealSlot>>(MatDialogRef);

  protected days = DAYS_OF_WEEK;
  protected meals = MEAL_TYPES;
  protected formatDayOfWeek = formatDayOfWeek;

  protected selectedDay: DayOfWeek = 'mon';
  protected selectedMeal: MealType = 'breakfast';

  selectDay(day: DayOfWeek) {
    this.selectedDay = day;
  }

  selectMeal(meal: MealType) {
    this.selectedMeal = meal;
  }

  confirm() {
    this._dialogRef.close({
      day: this.selectedDay,
      meal: this.selectedMeal,
    });
  }
}
