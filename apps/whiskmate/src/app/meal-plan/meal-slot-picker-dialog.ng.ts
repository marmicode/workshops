import {
  ChangeDetectionStrategy,
  Component,
  output,
} from '@angular/core';
import type { MealSlot } from './meal-plan';

/**
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-meal-slot-picker-dialog',
  template: `Meal slot picker — 🚧 work in progress`,
})
export class MealSlotPickerDialog {
  confirmed = output<MealSlot>();
}
