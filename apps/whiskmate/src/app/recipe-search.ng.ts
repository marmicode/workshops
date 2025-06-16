import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-search',
  template: `🚧 &lt;app-recipe-search&gt; 🚧`,
})
export class RecipeSearch {
  protected recipes: Recipe[] = [
    {
      id: 'rec_burger',
      name: 'Burger',
      ingredients: ['bun', 'beef', 'lettuce', 'tomato', 'onion', 'pickle'],
      instructions: [
        '1. Cook the beef',
        '2. Put the beef in the bun',
        '3. Add the lettuce, tomato, onion, and pickle',
      ],
    },
    {
      id: 'rec_pizza',
      name: 'Pizza',
      ingredients: ['dough', 'tomato sauce', 'cheese', 'pepperoni'],
      instructions: [
        '1. Roll out the dough',
        '2. Add the tomato sauce',
        '3. Add the cheese',
        '4. Add the pepperoni',
      ],
    },
    {
      id: 'rec_pasta',
      name: 'Pasta',
      ingredients: ['pasta', 'tomato sauce', 'cheese'],
      instructions: [
        '1. Cook the pasta',
        '2. Add the tomato sauce',
        '3. Add the cheese',
      ],
    },
  ];
}

interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
}
