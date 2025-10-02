import { effect } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Recipe } from '../recipe/recipe';
import { recipeMother } from '../testing/recipe.mother';
import { MealPlanner } from './meal-planner';

describe(MealPlanner.name, () => {
  it('should be reactive', async () => {
    const { mealPlanner, burger, salad } = createMealPlanner();

    const spy = vi.fn<(reciopes: Recipe[]) => void>();
    runEffect(() => {
      spy(mealPlanner.recipes());
    });

    spy.mockClear();
    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    await expect
      .poll(() => spy)
      .toHaveBeenCalledExactlyOnceWith([
        expect.objectContaining({ name: 'Burger' }),
        expect.objectContaining({ name: 'Salad' }),
      ]);
  });

  it('should add recipe', () => {
    const { mealPlanner, burger, salad } = createMealPlanner();

    mealPlanner.addRecipe(burger);
    mealPlanner.addRecipe(salad);

    expect(mealPlanner.recipes()).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('should not allow recipe duplicates', () => {
    const { mealPlanner, burgerDuplicate } = createMealPlannerWithBurger();

    expect(mealPlanner.canAddRecipe(burgerDuplicate)).toBe(false);
  });

  it('should allow new recipes', () => {
    const { mealPlanner, salad } = createMealPlannerWithBurger();

    expect(mealPlanner.canAddRecipe(salad)).toBe(true);
  });

  it('should throw error if recipe is already present', () => {
    const { mealPlanner, burgerDuplicate } = createMealPlannerWithBurger();

    expect(() => mealPlanner.addRecipe(burgerDuplicate)).toThrow(
      `Can't add recipe.`,
    );
  });

  function createMealPlannerWithBurger() {
    const { mealPlanner, burger, ...utils } = createMealPlanner();

    mealPlanner.addRecipe(burger);

    return {
      mealPlanner,
      ...utils,
    };
  }

  function createMealPlanner() {
    return {
      burger: recipeMother.withBasicInfo('Burger').build(),
      burgerDuplicate: recipeMother.withBasicInfo('Burger').build(),
      salad: recipeMother.withBasicInfo('Salad').build(),
      mealPlanner: TestBed.inject(MealPlanner),
    };
  }
});

function runEffect(effectFn: () => void) {
  TestBed.runInInjectionContext(() => {
    effect(effectFn);
  });
}
