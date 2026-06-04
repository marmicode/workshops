import { describe, it } from 'vitest';
import { RecipeSearch } from './recipe-search.ng';

describe(RecipeSearch.name, () => {
  it.todo('shows prompt before search', () => {
    // Arrange with fake repository.
    // Mount RecipeSearch.
    // Assert prompt visible; catalog empty.
  });

  it.todo('displays results after search', () => {
    // Arrange fake repository with Burger and Salad.
    // Mount, submit keywords "" or trigger load per implementation.
    // Assert two wm-recipe-preview cards with names.
  });

  it.todo('shows empty state when no matches', () => {
    // Arrange fake repository returning [] for keywords: 'xyz'.
    // Act search xyz.
    // Assert "No recipes found" (or equivalent).
  });
});
