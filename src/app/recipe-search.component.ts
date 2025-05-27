import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { createRecipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-search',
  template: `
    <ul>
      @for(recipe of recipes(); track recipe.id) {
      <li>
        <span>{{ recipe.name }}</span>
        <button (click)="removeRecipe(recipe.id)" (mouseenter)="(42)">
          REMOVE
        </button>
      </li>
      }
    </ul>
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

  removeRecipe(recipeId: string) {
    this.recipes.update((recipes) => recipes.filter((r) => r.id !== recipeId));
  }
}
