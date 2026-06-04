import { describe, it } from 'vitest';
import { MealPlanStore } from './meal-plan-store';

describe(MealPlanStore.name, () => {
  it.todo('adds recipe to slot', () => {
    // Arrange empty store.
    // Act `add({ slot: { day: 'tue', meal: 'dinner' }, recipe: burger })`.
    // Assert `plannedMeals()` contains burger at Tuesday dinner.
  });

  it.todo('rejects duplicate recipe in same slot', () => {
    // Arrange store with burger at Tuesday dinner.
    // Act `add` same slot and recipe.
    // Assert throws or returns error / does not duplicate entry.
  });
});
