import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import {
  createDefaultRecipeFilterCriteria,
  createRecipeFilterCriteria,
} from './recipe-filter-criteria';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository/recipe-repository.fake';
import type { Recipe } from './recipe';
import { recipeMother } from './recipe.mother';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it('shows prompt before search', async () => {
    const burger = recipeMother.withBasicInfo('Burger').build();
    const salad = recipeMother.withBasicInfo('Salad').build();

    const { fixture } = await setUpRecipeSearch([burger, salad]);

    const prompt = fixture.debugElement.query(
      By.css('[data-testid="search-prompt"]'),
    );
    const catalog = fixture.debugElement.query(By.css('wm-catalog'));
    const previews = fixture.debugElement.queryAll(
      By.css('wm-recipe-preview'),
    );

    expect(prompt).toBeTruthy();
    expect(catalog).toBeTruthy();
    expect(previews).toHaveLength(0);
  });

  it('displays results after search', async () => {
    const burger = recipeMother.withBasicInfo('Burger').build();
    const salad = recipeMother.withBasicInfo('Salad').build();

    const { fixture } = await setUpRecipeSearch([burger, salad]);

    submitSearch(fixture, '');
    await fixture.whenStable();
    fixture.detectChanges();

    const names = recipeNames(fixture);
    expect(names).toHaveLength(2);
    expect(names).toEqual(expect.arrayContaining(['Burger', 'Salad']));
  });

  it('shows empty state when no matches', async () => {
    const burger = recipeMother.withBasicInfo('Burger').build();

    const { fixture } = await setUpRecipeSearch([burger]);

    submitSearch(fixture, 'xyz');
    await fixture.whenStable();
    fixture.detectChanges();

    const emptyState = fixture.debugElement.query(
      By.css('[data-testid="empty-state"]'),
    );

    expect(emptyState).toBeTruthy();
    expect(emptyState.nativeElement.textContent).toMatch(/no recipes found/i);
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

  const fixture = TestBed.createComponent(RecipeSearch);
  fixture.detectChanges();
  await fixture.whenStable();

  return { fixture, repository };
}

function submitSearch(
  fixture: ComponentFixture<RecipeSearch>,
  keywords: string,
) {
  fixture.componentInstance.onFilterChange(
    createRecipeFilterCriteria({
      ...createDefaultRecipeFilterCriteria(),
      keywords,
    }),
  );
  fixture.detectChanges();
}

function recipeNames(fixture: ComponentFixture<RecipeSearch>): string[] {
  return fixture.debugElement
    .queryAll(By.css('[data-testid="recipe-name"]'))
    .map((element) => element.nativeElement.textContent.trim());
}
