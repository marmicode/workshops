import { Component } from '@angular/core';
import { createRecipe } from './recipe';

@Component({
  selector: 'app-recipe-search',
  template: `
    <ul>
      @for(recipe of recipes; track recipe.id) {
      <li>
        <span>{{ recipe.name }}</span>
        <button (click)="removeRecipe(recipe.id)">REMOVE</button>
      </li>
      }
    </ul>
  `,
})
export class RecipeSearch {
  protected recipes = [
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
  ];

  removeRecipe(recipeId: string) {
    this.recipes = this.recipes.filter((r) => r.id !== recipeId);
  }
}
