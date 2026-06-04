import { describe, expect, it } from 'vitest';
import { MealPlanStore } from './meal-plan-store';
import { TestBed } from '@angular/core/testing';

describe(MealPlanStore.name, () => {
  it.todo('adds recipe to slot', () => {
    const store = new MealPlanStore();
    store.add({
      slot: { day: 'tue', meal: 'dinner' },
      recipe: {
        id: '1',
        name: 'Burger',
        description: 'A burger',
        ingredients: [{ name: '1 cup bread' }, { name: '2 cups meat' }],
        steps: ['1. Cook the meat', '2. Add the bread'],
        pictureUri: 'https://example.com/burger.jpg',
      },
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
