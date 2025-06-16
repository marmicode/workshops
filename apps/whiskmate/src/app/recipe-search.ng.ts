import { Component, computed, signal } from '@angular/core';
import { createRecipe, Recipe } from './recipe';

@Component({
  selector: 'app-recipe-search',
  template: `
    <ul>
      @for(recipe of recipesWithCartInfo(); track recipe.id) {
      <li>
        <span>{{ recipe.name }}</span>
        <button [disabled]="recipe.isAdded" (click)="addToCart(recipe)">
          ADD
        </button>
      </li>
      }
    </ul>
    <hr />
    <h2>Cart</h2>
    <ul>
      @for(recipe of cart(); track recipe.id) {
      <li>
        <span>{{ recipe.name }}</span>
      </li>
      }
    </ul>
  `,
})
export class RecipeSearch {
  protected recipes = signal<Recipe[]>([
    createRecipe({
      id: 'rec_burger',
      name: 'Burger',
      ingredients: ['bun', 'beef', 'lettuce', 'tomato', 'onion', 'pickle'],
      instructions: [
        '1. Cook the beef',
        '2. Put the beef in the bun',
        '3. Add the lettuce, tomato, onion, and pickle',
      ],
    }),
    createRecipe({
      id: 'rec_pizza',
      name: 'Pizza',
      ingredients: ['dough', 'tomato sauce', 'cheese', 'pepperoni'],
      instructions: [
        '1. Roll out the dough',
        '2. Add the tomato sauce',
        '3. Add the cheese',
        '4. Add the pepperoni',
      ],
    }),
    createRecipe({
      id: 'rec_pasta',
      name: 'Pasta',
      ingredients: ['pasta', 'tomato sauce', 'cheese'],
      instructions: [
        '1. Cook the pasta',
        '2. Add the tomato sauce',
        '3. Add the cheese',
      ],
    }),
  ]);
  protected cart = signal<Recipe[]>([]);
  protected recipesWithCartInfo = computed(() => {
    return this.recipes().map((recipe) => {
      return {
        ...recipe,
        isAdded: this.cart().some((r) => r.id === recipe.id),
      };
    });
  });

  protected addToCart(recipe: Recipe) {
    this.cart.update((recipes) => [...recipes, recipe]);
  }
}
