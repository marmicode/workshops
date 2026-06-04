import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';
import { MealPlanStore } from '../meal-plan/meal-plan-store';
import { MealSlotPickerDialog } from '../meal-plan/meal-slot-picker-dialog.ng';
import { createMealSlot, type MealSlot } from '../meal-plan/meal-plan';
import type { Recipe } from './recipe';
import { recipeMother } from './recipe.mother';
import { RecipeAddButton } from './recipe-add-button.ng';

@Component({
  imports: [RecipeAddButton],
  template: '<wm-recipe-add-button [recipe]="recipe" />',
})
class RecipeAddButtonHost {
  recipe!: Recipe;
}

describe(RecipeAddButton.name, () => {
  it('adds recipe and shows snackbar', async () => {
    const burger = recipeMother.withBasicInfo('Burger').build();
    const tuesdayDinner = createMealSlot({ day: 'tue', meal: 'dinner' });

    const { hostFixture, mealPlanStore, snackBar } =
      await setUpRecipeAddButton(burger);

    clickAdd(hostFixture);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    await pickMealSlot(hostFixture, tuesdayDinner);
    await hostFixture.whenStable();

    expect(mealPlanStore.add).toHaveBeenCalledOnce();
    expect(mealPlanStore.add).toHaveBeenCalledWith({
      slot: tuesdayDinner,
      recipe: burger,
    });

    const [message] = vi.mocked(snackBar.open).mock.calls[0] ?? [];
    expect(message).toContain('Tuesday dinner');
  });
});

async function setUpRecipeAddButton(recipe: Recipe) {
  await TestBed.configureTestingModule({
    imports: [
      RecipeAddButtonHost,
      RecipeAddButton,
      MealSlotPickerDialog,
      MatDialogModule,
      MatSnackBarModule,
    ],
    providers: [provideNoopAnimations()],
  }).compileComponents();

  const mealPlanStore = TestBed.inject(MealPlanStore);
  vi.spyOn(mealPlanStore, 'add');
  const snackBar = TestBed.inject(MatSnackBar);
  vi.spyOn(snackBar, 'open');

  const hostFixture = TestBed.createComponent(RecipeAddButtonHost);
  hostFixture.componentInstance.recipe = recipe;
  hostFixture.detectChanges();
  await hostFixture.whenStable();

  return { hostFixture, mealPlanStore, snackBar };
}

function clickAdd(hostFixture: ComponentFixture<RecipeAddButtonHost>) {
  const addButton = hostFixture.debugElement.query(By.css('button'));
  addButton.triggerEventHandler('click');
}

async function pickMealSlot(
  hostFixture: ComponentFixture<RecipeAddButtonHost>,
  slot: MealSlot,
) {
  await hostFixture.whenStable();

  const dialogRef = TestBed.inject(MatDialog).openDialogs.at(-1);
  if (!dialogRef) {
    throw new Error('Meal slot picker dialog not open');
  }
  const picker = dialogRef.componentInstance as MealSlotPickerDialog;
  picker.selectDay(slot.day);
  picker.selectMeal(slot.meal);
  const closed = firstValueFrom(dialogRef.afterClosed());
  picker.confirm();
  await closed;
  hostFixture.detectChanges();
}
