import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { recipeMother } from '../../recipe-shared/testing/recipe.mother';
import { RecipeRepository } from '../recipe-repository';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from '../recipe-repository.fake';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('shows all recipes when mounted', async () => {
    const { getRecipeNames } = await mountRecipeSearch();

    const names = getRecipeNames();
    expect(names).toEqual(['Burger', 'Salad']);
  });
});

async function mountRecipeSearch() {
  TestBed.configureTestingModule({
    providers: [
      provideZonelessChangeDetection(),
      provideRecipeRepositoryFake(),
    ],
  });

  TestBed.inject(RecipeRepositoryFake).configure({
    recipes: [
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ],
  });

  const fixture = TestBed.createComponent(RecipeSearch);
  await fixture.whenStable();

  return {
    getRecipeNames() {
      return fixture.debugElement
        .queryAll(By.css('h2'))
        .map((el) => el.nativeElement.textContent);
    },
  };
}
