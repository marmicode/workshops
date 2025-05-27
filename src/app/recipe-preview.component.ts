import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-preview',
  template: `<h2>{{ recipe().name }}</h2>`,
})
export class RecipePreview {
  recipe = input.required<Recipe>();
}
