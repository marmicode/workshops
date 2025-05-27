import { describe, it, expect } from 'vitest';
import { Cart } from './cart';
import { createRecipe } from './recipe';

describe('cart', () => {
  it('is empty by default', () => {
    const { cart } = setUp();
    expect(cart.getRecipes()).toEqual([]);
  });

  it('can add recipes', () => {
    const { cart, burger, salad } = setUp();
    cart.addRecipe(burger);
    cart.addRecipe(salad);
    expect(cart.getRecipes()).toEqual([
      expect.objectContaining({ name: 'Burger' }),
      expect.objectContaining({ name: 'Salad' }),
    ]);
  });

  it('throws if recipe is already added', () => {
    const { cart, burger, burgerDuplicate } = setUp();
    cart.addRecipe(burger);
    expect(() => cart.addRecipe(burgerDuplicate)).toThrow(
      'Recipe already in cart'
    );
  });

  it('`canAddRecipe` returns true if recipe is not in cart', () => {
    const { cart, burger } = setUp();
    expect(cart.canAddRecipe(burger)).toBe(true);
  });

  it('`canAddRecipe` returns false if recipe is already in cart', () => {
    const { cart, burger, burgerDuplicate } = setUp();
    cart.addRecipe(burger);
    expect(cart.canAddRecipe(burgerDuplicate)).toBe(false);
  });
});

function setUp() {
  const cart = new Cart();
  const burger = createRecipe({
    id: 'rec_burger',
    name: 'Burger',
    ingredients: ['bun', 'beef', 'lettuce', 'tomato'],
    instructions: [
      'cook the beef',
      'put the beef on the bun',
      'put the lettuce on the bun',
      'put the tomato on the bun',
    ],
  });
  const burgerDuplicate = createRecipe({ ...burger });
  const salad = createRecipe({
    id: 'rec_salad',
    name: 'Salad',
    ingredients: ['lettuce', 'tomato', 'cucumber'],
    instructions: ['wash the lettuce', 'wash the tomato', 'wash the cucumber'],
  });
  return { cart, burger, burgerDuplicate, salad };
}
