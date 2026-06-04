import { describe, expect, it } from 'vitest';
import {
  createMealSlot,
  createPlannedMeal,
  formatMealSlot,
  mealSlotKey,
  mealSlotsEqual,
} from './meal-plan';
import { recipeMother } from '../recipe/recipe.mother';

describe('meal-plan models', () => {
  it('keys slots by day and meal', () => {
    const slot = createMealSlot({ day: 'tue', meal: 'dinner' });

    expect(mealSlotKey(slot)).toBe('tue-dinner');
  });

  it('compares slots by day and meal', () => {
    const tueDinner = createMealSlot({ day: 'tue', meal: 'dinner' });
    const wedDinner = createMealSlot({ day: 'wed', meal: 'dinner' });

    expect(mealSlotsEqual(tueDinner, tueDinner)).toBe(true);
    expect(mealSlotsEqual(tueDinner, wedDinner)).toBe(false);
  });

  it('formats slots for user-facing messages', () => {
    const slot = createMealSlot({ day: 'tue', meal: 'dinner' });

    expect(formatMealSlot(slot)).toBe('Tuesday dinner');
  });

  it('builds planned meals from slot and recipe', () => {
    const burger = recipeMother.withBasicInfo('Burger').build();
    const plannedMeal = createPlannedMeal({
      slot: { day: 'tue', meal: 'dinner' },
      recipe: burger,
    });

    expect(plannedMeal.recipe.name).toBe('Burger');
    expect(plannedMeal.slot).toEqual({ day: 'tue', meal: 'dinner' });
  });
});
