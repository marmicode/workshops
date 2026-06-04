import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Recipe } from './recipe';

/**
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-add-button',
  template: `Add — 🚧 work in progress`,
})
export class RecipeAddButton {
  recipe = input.required<Recipe>();
}
