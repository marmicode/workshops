import { provideZonelessChangeDetection } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { recipeMother } from '../../recipe-shared/testing/recipe.mother';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from '../recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('shows all recipes when mounted', async () => {
    const { getRecipeNames } = await mountRecipeSearch();

    await expect.poll(getRecipeNames).toEqual(['Burger', 'Salad', 'Pizza']);
  });

  it('filters by keywords', async () => {
    const { getRecipeNames, typeKeywords } = await mountRecipeSearch();

    await typeKeywords('Bur');

    await expect.poll(getRecipeNames).toEqual(['Burger']);
  });
});

async function mountRecipeSearch() {
  await render(RecipeSearch, {
    providers: [
      provideZonelessChangeDetection(),
      provideRecipeRepositoryFake(),
    ],
    configureTestBed(testBed) {
      testBed
        .inject(RecipeRepositoryFake)
        .configure({
          recipes: [
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
            recipeMother.withBasicInfo('Pizza').build(),
          ],
        });
    },
  });

  return {
    getRecipeNames() {
      return screen
        .getAllByRole('heading', { level: 2 })
        .map((el) => el.textContent);
    },
    async typeKeywords(keywords: string) {
      await userEvent.type(screen.getByRole('textbox'), keywords);
    },
  };
}
