import { Component } from '@angular/core';
import { RecipeSearch } from './recipe-search.ng';

@Component({
  selector: 'app-root',
  imports: [RecipeSearch],
  template: ` <app-recipe-search /> `,
})
export class App {}
