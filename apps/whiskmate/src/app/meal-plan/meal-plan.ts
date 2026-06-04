import type { Recipe } from '../recipe/recipe';

export interface MealSlot {
  day: DayOfWeek;
  meal: MealType;
}

export interface PlannedMeal {
  slot: MealSlot;
  recipe: Recipe;
}

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

export const DAYS_OF_WEEK = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
] as const;

export type MealType = (typeof MEAL_TYPES)[number];

export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'] as const;

const DAY_LABELS: Record<DayOfWeek, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export function createMealSlot(slot: MealSlot): MealSlot {
  return slot;
}

export function createPlannedMeal(plannedMeal: PlannedMeal): PlannedMeal {
  return plannedMeal;
}

export function mealSlotKey(slot: MealSlot): string {
  return `${slot.day}-${slot.meal}`;
}

export function mealSlotsEqual(a: MealSlot, b: MealSlot): boolean {
  return a.day === b.day && a.meal === b.meal;
}

export function formatDayOfWeek(day: DayOfWeek): string {
  return DAY_LABELS[day];
}

export function formatMealType(meal: MealType): string {
  return meal;
}

export function formatMealSlot(slot: MealSlot): string {
  return `${formatDayOfWeek(slot.day)} ${formatMealType(slot.meal)}`;
}
