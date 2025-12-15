import { TestBed } from '@angular/core/testing';
import { render, within, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { RecipeSelectionStore, RecipeSelector } from './recipe-selector';
import { recipeMother } from './recipe.mother';

describe(RecipeSelector.name, () => {
  it('display recipes', async () => {
    const { findRecipeItems } = await mountRecipeSelector();

    const recipeEls = await findRecipeItems();
    expect(recipeEls.length).toBe(3);
    expect(recipeEls[0].textContent).toContain('Burger');
    expect(recipeEls[1].textContent).toContain('Salad');
    expect(recipeEls[2].textContent).toContain('Pizza');
  });

  it('selects recipes in RecipeStore', async () => {
    const { clickRecipeItemCheckboxAt, recipeSelectionStore } =
      await mountRecipeSelector();

    await clickRecipeItemCheckboxAt(0); // Burger
    await clickRecipeItemCheckboxAt(2); // Pizza

    expect(recipeSelectionStore.selectedRecipeIds()).toEqual([
      'rec_burger',
      'rec_pizza',
    ]);
  });

  it('selects recipes that are selected in RecipeStore', async () => {
    const { recipeSelectionStore } = await mountRecipeSelector();

    recipeSelectionStore.selectRecipe('rec_burger');
    recipeSelectionStore.selectRecipe('rec_pizza');

    expect(
      await screen.findByRole('checkbox', {
        name: 'Select Burger',
        checked: true,
      }),
    ).toBeDefined();
    expect(
      await screen.findByRole('checkbox', {
        name: 'Select Salad',
        checked: false,
      }),
    ).toBeDefined();
    expect(
      await screen.findByRole('checkbox', {
        name: 'Select Pizza',
        checked: true,
      }),
    ).toBeDefined();
  });
});

async function mountRecipeSelector() {
  const { container } = await render(RecipeSelector, {
    inputs: {
      recipes: [
        recipeMother.withBasicInfo('Burger').build(),
        recipeMother.withBasicInfo('Salad').build(),
        recipeMother.withBasicInfo('Pizza').build(),
      ],
    },
  });

  const findRecipeItems = () => within(container).findAllByRole('listitem');

  return {
    clickRecipeItemCheckboxAt: async (index: number) => {
      const recipeEls = await findRecipeItems();
      // TODO: or userEvent.click(recipeEls[index]) if the whole element is clickable.
      await userEvent.click(
        await within(recipeEls[index]).findByRole('checkbox'),
      );
    },
    findRecipeItems,
    recipeSelectionStore: TestBed.inject(RecipeSelectionStore),
  };
}
