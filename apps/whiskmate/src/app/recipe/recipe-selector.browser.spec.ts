import { inputBinding } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { within } from '@testing-library/angular';
import { page } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import { RecipeSelectionStore, RecipeSelector } from './recipe-selector';
import { recipeMother } from './recipe.mother';

describe(RecipeSelector.name, () => {
  it('display recipes', async () => {
    const { recipeItemsLocator } = await mountRecipeSelector();

    await expect.element(recipeItemsLocator).toHaveLength(3);
    await expect.element(recipeItemsLocator.nth(0)).toHaveTextContent('Burger');
    await expect.element(recipeItemsLocator.nth(1)).toHaveTextContent('Salad');
    await expect.element(recipeItemsLocator.nth(2)).toHaveTextContent('Pizza');
  });

  it('selects recipes in RecipeStore', async () => {
    const { clickRecipeItemCheckboxAt, recipeSelectionStore } =
      await mountRecipeSelector();

    await clickRecipeItemCheckboxAt(0); // Burger
    await clickRecipeItemCheckboxAt(2); // Pizza

    await expect
      .poll(() => recipeSelectionStore.selectedRecipeIds())
      .toEqual(['rec_burger', 'rec_pizza']);
  });

  it('selects recipes that are selected in RecipeStore', async () => {
    const { mount, recipeSelectionStore } = await setUpRecipeSelector();

    recipeSelectionStore.selectRecipe('rec_burger');
    recipeSelectionStore.selectRecipe('rec_pizza');

    const { recipeItemCheckboxesLocator } = mount();

    await expect.element(recipeItemCheckboxesLocator.nth(0)).toBeChecked();
    await expect.element(recipeItemCheckboxesLocator.nth(1)).not.toBeChecked();
    await expect.element(recipeItemCheckboxesLocator.nth(2)).toBeChecked();
  });
});

async function mountRecipeSelector() {
  const { mount, ...rest } = await setUpRecipeSelector();
  const mountUtils = mount();
  return {
    ...rest,
    ...mountUtils,
  };
}

/**
 * We do not need this here but it's an example for more complex tests,
 * that need to do some setup before mounting the component.
 */
async function setUpRecipeSelector() {
  TestBed.configureTestingModule({
    providers: [],
  });

  return {
    recipeSelectionStore: TestBed.inject(RecipeSelectionStore),
    mount() {
      TestBed.createComponent(RecipeSelector, {
        bindings: [
          inputBinding('recipes', () => [
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
            recipeMother.withBasicInfo('Pizza').build(),
          ]),
        ],
      });

      const recipeItemsLocator = page.getByRole('listitem');
      const recipeItemCheckboxesLocator =
        recipeItemsLocator.getByRole('checkbox');

      return {
        clickRecipeItemCheckboxAt: async (index: number) => {
          await recipeItemCheckboxesLocator.nth(index).click();
        },
        recipeItemsLocator,
        recipeItemCheckboxesLocator,
      };
    },
  };
}
