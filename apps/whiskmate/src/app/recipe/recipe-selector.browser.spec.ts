import { inputBinding } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RecipeSelectionStore, RecipeSelector } from './recipe-selector';
import { recipeMother } from './recipe.mother';

describe(RecipeSelector.name, () => {
  it('display recipes', async () => {
    const { getRecipeItems } = await mountRecipeSelector();

    await expect.poll(() => getRecipeItems()).toHaveLength(3);
    expect.soft(getRecipeItems()[0]).toHaveTextContent('Burger');
    expect.soft(getRecipeItems()[1]).toHaveTextContent('Salad');
    expect.soft(getRecipeItems()[2]).toHaveTextContent('Pizza');
  });

  it('display recipes if you need to wait for many things', async () => {
    const { getRecipeItems } = await mountRecipeSelector();

    await vi.waitFor(async () => {
      const recipeItems = getRecipeItems();
      expect(recipeItems).toHaveLength(3);
      expect(recipeItems[0]).toHaveTextContent('Burger');
      expect(recipeItems[1]).toHaveTextContent('Salad');
      expect(recipeItems[2]).toHaveTextContent('Pizza');
    });
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

    const { getRecipeItemCheckboxes } = mount();

    await vi.waitFor(() => {
      const recipeItems = getRecipeItemCheckboxes();
      expect(recipeItems[0].checked).toBe(true);
      expect(recipeItems[1].checked).toBe(false);
      expect(recipeItems[2].checked).toBe(true);
    });
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
      const { nativeElement } = TestBed.createComponent(RecipeSelector, {
        bindings: [
          inputBinding('recipes', () => [
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
            recipeMother.withBasicInfo('Pizza').build(),
          ]),
        ],
      });

      const getRecipeItems = () =>
        within(nativeElement).getAllByRole('listitem');
      const findRecipeItems = () =>
        within(nativeElement).findAllByRole('listitem');

      return {
        clickRecipeItemCheckboxAt: async (index: number) => {
          const recipeEls = await findRecipeItems();
          // TODO: or userEvent.click(recipeEls[index]) if the whole element is clickable.
          await userEvent.click(
            await within(recipeEls[index]).findByRole('checkbox'),
          );
        },
        getRecipeItems,
        getRecipeItemCheckboxes: () =>
          within(nativeElement).getAllByRole<HTMLInputElement>('checkbox'),
      };
    },
  };
}
