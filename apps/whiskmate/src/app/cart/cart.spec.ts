import { TestBed } from '@angular/core/testing';
import { recipeMother } from '../recipe-shared/testing/recipe.mother';
import { Cart } from './cart';
import { describe, it, expect } from 'vitest';

describe(Cart.name, () => {
  it('adds recipes', async () => {
    const cart = TestBed.inject(Cart);

    const burger = recipeMother.withBasicInfo('Burger').build();
    const salad = recipeMother.withBasicInfo('Salad').build();

    cart.addRecipe(burger);
    cart.addRecipe(salad);

    expect(cart.recipes()).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });
});
