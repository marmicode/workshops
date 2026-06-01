import { TestBed } from '@angular/core/testing';
import { describe, expect, it, onTestFinished, vi } from 'vitest';
import { page } from 'vitest/browser';
import { MealPlanStore } from '../meal-plan/meal-plan-store';
import { recipeMother } from './recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository/recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('searches recipes without filtering', async () => {
    const { recipeHeadings } = await mountRecipeSearch();

    await expect.element(recipeHeadings).toHaveLength(2);
    await expect.element(recipeHeadings.nth(0)).toHaveTextContent('Burger');
    await expect.element(recipeHeadings.nth(1)).toHaveTextContent('Salad');
  });

  it('filters recipes by keywords', async () => {
    const { recipeHeadings, updateFilter } = await mountRecipeSearch();

    await updateFilter({
      keywords: 'Burg',
    });

    await expect.element(recipeHeadings).toHaveTextContent('Burger');
  });

  it('adds recipe to meal planner', async () => {
    const { addButtons, getMealPlannerRecipeNames } = await mountRecipeSearch();

    await addButtons.first().click();

    await expect.poll(() => getMealPlannerRecipeNames()).toEqual(['Burger']);
  });

  it("disables add button if recipe can't be added", async () => {
    const { addButtons } = await mountRecipeSearchWithBurgerInMealPlanner();

    /* Can't add burger because there is already a burger with the same id. */
    await expect.element(addButtons.first()).toBeDisabled();
  });

  async function mountRecipeSearchWithBurgerInMealPlanner() {
    const { mealPlanStore, ...utils } = await mountRecipeSearch();

    mealPlanStore.add(recipeMother.withBasicInfo('Burger').build());

    return utils;
  }

  async function mountRecipeSearch() {
    vi.useFakeTimers().setTimerTickMode('nextTimerAsync');
    onTestFinished(() => {
      vi.useRealTimers();
    });

    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake(), MealPlanStore],
    });

    TestBed.inject(RecipeRepositoryFake).configure({
      recipes: [
        recipeMother.withBasicInfo('Burger').build(),
        recipeMother.withBasicInfo('Salad').build(),
      ],
    });

    TestBed.createComponent(RecipeSearch);

    const mealPlanStore = TestBed.inject(MealPlanStore);

    return {
      addButtons: page.getByRole('button', { name: 'ADD' }),
      mealPlanStore,
      recipeHeadings: page.getByRole('heading'),
      getMealPlannerRecipeNames: () =>
        mealPlanStore.meals().map((recipe) => recipe.name),
      updateFilter: async ({ keywords }: { keywords: string }) => {
        await page.getByLabelText('Keywords').fill(keywords);
        await vi.advanceTimersByTimeAsync(300);
      },
    };
  }
});
