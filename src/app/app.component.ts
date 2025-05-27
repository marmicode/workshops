import { Component } from '@angular/core';
import { RecipeSearch } from './recipe-search.component';

@Component({
  selector: 'app-root',
  imports: [RecipeSearch],
  template: `<app-recipe-search />`,
})
export class AppComponent {
  title = 'whiskmate';
}
