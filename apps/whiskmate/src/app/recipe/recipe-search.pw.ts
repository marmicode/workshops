import { test, expect } from '@testronaut/angular';
import { RecipeSearch } from './recipe-search.ng';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository/recipe-repository.fake';
import { recipeMother } from './recipe.mother';
import { TestBed } from '@angular/core/testing';

test('recipe search', async ({ page, mount, runInBrowser }) => {
  await runInBrowser('configure', async () => {
    TestBed.configureTestingModule({
      providers: [provideRecipeRepositoryFake()],
    });

    TestBed.inject(RecipeRepositoryFake).configure({
      recipes: [
        recipeMother.withBasicInfo('Burger').build(),
        recipeMother.withBasicInfo('Salad').build(),
        recipeMother.withBasicInfo('Pizza').build(),
      ],
    });
  });
  await mount(RecipeSearch);

  const keywords = page.getByText('Keywords');
  await keywords.click();
  await keywords.fill('bur');
  await page.getByRole('button', { name: 'ADD' }).click();
  await expect(page.getByRole('heading', { level: 2 })).toContainText('Burger');
  await expect(page.getByRole('button')).toContainText('ADD');
  await expect(page.getByRole('button')).toBeDisabled();
});
