import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-preview',
  template: `
    <h2>{{ recipe().name }}</h2>
    <ng-content />
  `,
  styles: `
    :host {
      display: block;
      border: 1px solid #ccc;
      border-radius: 3px;
      text-align: center;
      margin: 1rem;
      padding: 1rem;
      max-width: 200px;
    }
  `,
})
export class RecipePreview {
  recipe = input.required<Recipe>();
}
