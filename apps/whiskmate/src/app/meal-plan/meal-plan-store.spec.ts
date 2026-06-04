import { describe, expect, it } from 'vitest';
import { MealPlanStore } from './meal-plan-store';
import { TestBed } from '@angular/core/testing';
import { recipeMother } from '../recipe/recipe.mother';

describe(MealPlanStore.name, () => {
  it('adds recipe to slot', () => {
    const { mealPlanStore } = setUpMealPlanStore();
    mealPlanStore.add({
      slot: { day: 'tue', meal: 'dinner' },
      recipe: recipeMother.withBasicInfo('Burger').build(),
    });

    expect(mealPlanStore.plannedMeals()).toMatchObject([
      {
        slot: { day: 'tue', meal: 'dinner' },
        recipe: {
          name: 'Burger',
        },
      },
    ]);
  });

  it('rejects duplicate recipe in same slot', () => {
    const { mealPlanStore } = setUpMealPlanStore();
    const burger = recipeMother.withBasicInfo('Burger').build();
    const salad = recipeMother.withBasicInfo('Salad').build();
    const tuesdayDinner = { day: 'tue', meal: 'dinner' } as const;

    mealPlanStore.add({ slot: tuesdayDinner, recipe: burger });
    mealPlanStore.add({ slot: tuesdayDinner, recipe: salad });

    expect(mealPlanStore.plannedMeals()).toMatchObject([
      {
        slot: { day: 'tue', meal: 'dinner' },
        recipe: { name: 'Burger' },
      },
    ]);
  });
});

function setUpMealPlanStore() {
  return {
    mealPlanStore: TestBed.inject(MealPlanStore),
  };
}
