import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { render, screen } from '@testing-library/angular';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeFilterCriteria } from './recipe-filter-criteria';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';
import { TestBed } from '@angular/core/testing';

describe(RecipeSearch.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  it('should search recipes using given filter', async () => {
    const { getRecipeNames, updateFilter } = await renderComponent();

    await updateFilter({
      keywords: 'Burg',
      maxIngredientCount: 3,
    });

    await expect.poll(() => getRecipeNames()).toEqual(['Burger']);
  });

  it('displays loading state when searching', async () => {
    const { getRecipeNames, getLoadingSpinner, updateFilter, fake } =
      await renderComponent();

    fake.pause();

    updateFilter({
      keywords: 'Burg',
      maxIngredientCount: 3,
    });

    await expect.poll(() => getRecipeNames()).toEqual([]);
    await expect.poll(() => getLoadingSpinner()).toBeInTheDocument();
  });

  async function renderComponent() {
    const { debugElement, fixture } = await render(RecipeSearch, {
      providers: [provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed.overrideComponent(RecipeSearch, {
          set: {
            imports: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
          },
        });

        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });
    await fixture.whenStable();

    return {
      fake: TestBed.inject(RecipeRepositoryFake),
      getRecipeNames() {
        return debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe.name);
      },
      async updateFilter(filter: RecipeFilterCriteria) {
        debugElement
          .query(By.css('wm-recipe-filter'))
          .triggerEventHandler('filterChange', filter);
      },
      getLoadingSpinner() {
        return screen.getByRole('progressbar');
      },
    };
  }
});
