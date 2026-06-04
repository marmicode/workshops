import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import type { Recipe } from './recipe';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository/recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';
import { recipeMother } from './recipe.mother';

describe(RecipeSearch.name, () => {
  it('shows prompt before search', async () => {
    const burger = recipeMother.withBasicInfo('Burger').build();
    const salad = recipeMother.withBasicInfo('Salad').build();

    const { recipeNames, keywordsInput, searchButton } =
      await setUpRecipeSearch([burger, salad]);

    await expect.element(keywordsInput).toBeVisible();
    await expect.element(searchButton).toBeVisible();
    await expect.element(recipeNames).not.toBeInTheDocument();
  });

  it('displays results after search', async () => {
    const burger = recipeMother.withBasicInfo('Burger').build();
    const salad = recipeMother.withBasicInfo('Salad').build();

    const { keywordsInput, searchButton } = await setUpRecipeSearch([
      burger,
      salad,
    ]);

    await keywordsInput.fill('');
    await searchButton.click();

    await expect
      .element(page.getByTestId('recipe-name').filter({ hasText: 'Burger' }))
      .toBeVisible();
    await expect
      .element(page.getByTestId('recipe-name').filter({ hasText: 'Salad' }))
      .toBeVisible();
  });

  it('shows empty state when no matches', async () => {
    const burger = recipeMother.withBasicInfo('Burger').build();

    const { keywordsInput, searchButton, emptyState } = await setUpRecipeSearch(
      [burger],
    );

    await keywordsInput.fill('xyz');
    await searchButton.click();

    await expect.element(emptyState).toHaveTextContent(/no recipes found/i);
  });
});

async function setUpRecipeSearch(recipes: Recipe[]) {
  TestBed.resetTestingModule();

  await TestBed.configureTestingModule({
    imports: [RecipeSearch],
    providers: [provideRecipeRepositoryFake()],
  }).compileComponents();

  const repository = TestBed.inject(RecipeRepositoryFake);
  repository.configure({ recipes });

  TestBed.createComponent(RecipeSearch);

  return {
    recipeNames: page.getByTestId('recipe-name'),
    emptyState: page.getByTestId('empty-state'),
    keywordsInput: page.getByLabelText('Keywords'),
    searchButton: page.getByRole('button', { name: 'Search' }),
  };
}
