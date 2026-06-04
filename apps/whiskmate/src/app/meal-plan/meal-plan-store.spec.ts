import { describe, expect, it } from 'vitest';
import { MealPlanStore } from './meal-plan-store';
import { TestBed } from '@angular/core/testing';
import { recipeMother } from '../recipe/recipe.mother';

describe(MealPlanStore.name, () => {
  it('adds recipe to slot', () => {
    const store = new MealPlanStore();
    store.add({
      slot: { day: 'tue', meal: 'dinner' },
      recipe: recipeMother.withBasicInfo('Burger').build(),
    });

    expect(store.plannedMeals()).toMatchObject([
      {
        slot: { day: 'tue', meal: 'dinner' },
        recipe: {
          name: 'Burger',
        },
      },
    ]);
  });

  it.todo('rejects duplicate recipe in same slot', () => {
    // Arrange store with burger at Tuesday dinner.
    // Act `add` same slot and recipe.
    // Assert throws or returns error / does not duplicate entry.
  });
});

function setUpMealPlanStore() {
  return {
    mealPlanStore: TestBed.inject(MealPlanStore),
  };
}
