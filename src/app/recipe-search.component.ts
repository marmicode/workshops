import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { createRecipe, Recipe } from './recipe';
import { RecipePreview } from './recipe-preview.component';
import { Cart } from './cart';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-search',
  imports: [RecipePreview],
  template: `
    <p>Cart: {{ cartCount() }}</p>
    <hr />
    @for(recipe of recipes(); track recipe.id) {
    <app-recipe-preview [recipe]="recipe">
      <button (click)="addRecipeToCart(recipe)">ADD</button>
    </app-recipe-preview>
    }
  `,
})
export class RecipeSearch {
  protected recipes = signal([
    createRecipe({
      id: 'rec_burger',
      name: 'Burger',
      ingredients: ['bun', 'beef', 'lettuce', 'tomato'],
      instructions: [
        'cook the beef',
        'put the beef on the bun',
        'put the lettuce on the bun',
        'put the tomato on the bun',
      ],
    }),
    createRecipe({
      id: 'rec_salad',
      name: 'Salad',
      ingredients: ['lettuce', 'tomato', 'cucumber'],
      instructions: [
        'wash the lettuce',
        'wash the tomato',
        'wash the cucumber',
      ],
    }),
  ]);
  protected cartCount = computed(() => this._cart.count());
  private _cart = new Cart();

  addRecipeToCart(recipe: Recipe) {
    this._cart.addRecipe(recipe);
  }
}
