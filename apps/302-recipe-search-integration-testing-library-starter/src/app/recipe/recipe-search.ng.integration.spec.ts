import { InjectionToken, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { recipePreviewGlove } from './recipe-preview.glove';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('should search recipes without filtering', async () => {
    await renderComponent();

    const recipePreviews = await recipePreviewGlove.findAllRecipePreviews();
    expect.soft(recipePreviews).toHaveLength(2);
    expect.soft(await recipePreviews[0].findName()).toHaveTextContent('Burger');
    expect.soft(await recipePreviews[1].findName()).toHaveTextContent('Salad');
  });

  async function renderComponent() {
    t.configure({ providers: [provideRecipeRepositoryFake()] });
    t.inject(RecipeRepositoryFake).setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);
    await t.mount(RecipeSearch);
  }
});

const t = {
  configure(args: Parameters<typeof TestBed.configureTestingModule>[0]) {
    TestBed.configureTestingModule(args);
  },
  inject<T extends Type<unknown>>(
    token: T | InjectionToken<T>,
  ): InstanceType<T> {
    return TestBed.inject(token);
  },
  async mount<CMP extends Type<unknown>>(component: CMP) {
    const fixture = TestBed.createComponent(component);
    await fixture.whenStable();
    return fixture;
  },
};
