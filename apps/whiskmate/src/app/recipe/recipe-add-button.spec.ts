import { describe, expect, it, vi } from 'vitest';

const { MealPlanStore } = vi.hoisted(() => ({
  MealPlanStore: class MealPlanStore {},
}));

vi.mock('../meal-plan/meal-plan-store', () => ({
  MealPlanStore,
}));

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MealSlotPickerDialog } from '../meal-plan/meal-slot-picker-dialog.ng';
import {
  createMealSlot,
  formatDayOfWeek,
  type MealSlot,
} from '../meal-plan/meal-plan';
import { recipeMother } from './recipe.mother';
import { RecipeAddButton } from './recipe-add-button.ng';

describe(RecipeAddButton.name, () => {
  it.todo('adds recipe and shows snackbar', async () => {
    const burger = recipeMother.withBasicInfo('Burger').build();
    const tuesdayDinner = createMealSlot({ day: 'tue', meal: 'dinner' });

    const { fixture, loader, mealPlanStore, snackBar } =
      await setUpRecipeAddButton();

    fixture.componentRef.setInput('recipe', burger);
    fixture.detectChanges();

    clickButton(fixture.nativeElement, 'Add');
    fixture.detectChanges();

    await pickMealSlot(loader, fixture, tuesdayDinner);

    expect(mealPlanStore.add).toHaveBeenCalledOnce();
    expect(mealPlanStore.add).toHaveBeenCalledWith({
      slot: tuesdayDinner,
      recipe: burger,
    });

    const [message] = vi.mocked(snackBar.open).mock.calls[0] ?? [];
    expect(message).toContain('Tuesday dinner');
  });
});

async function setUpRecipeAddButton() {
  const mealPlanStore = { add: vi.fn() };

  await TestBed.configureTestingModule({
    imports: [
      RecipeAddButton,
      MealSlotPickerDialog,
      MatDialogModule,
      MatSnackBarModule,
    ],
    providers: [{ provide: MealPlanStore, useValue: mealPlanStore }],
  }).compileComponents();

  const fixture = TestBed.createComponent(RecipeAddButton);
  const loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  const snackBar = TestBed.inject(MatSnackBar);
  vi.spyOn(snackBar, 'open');

  return { fixture, loader, mealPlanStore, snackBar };
}

async function pickMealSlot(
  loader: HarnessLoader,
  fixture: ComponentFixture<RecipeAddButton>,
  slot: MealSlot,
) {
  await loader.getHarness(MatDialogHarness);

  const overlay = document.querySelector('.cdk-overlay-container');
  if (!overlay) {
    throw new Error('Dialog overlay not found');
  }
  clickButton(overlay, formatDayOfWeek(slot.day));
  clickButton(overlay, slot.meal);
  clickButton(overlay, 'Confirm');
  fixture.detectChanges();
}

function clickButton(root: ParentNode, label: string) {
  const button = Array.from(root.querySelectorAll('button')).find(
    (candidate) => candidate.textContent?.trim() === label,
  );
  if (!button) {
    throw new Error(`Button "${label}" not found`);
  }
  button.click();
}
