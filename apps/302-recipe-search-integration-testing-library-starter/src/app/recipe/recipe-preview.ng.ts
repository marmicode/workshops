import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Card } from '../shared/card.ng';
import type { Recipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-preview',
  imports: [Card],
  template: `<wm-card
    data-testid="recipe-preview"
    [pictureUri]="recipe().pictureUri"
  >
    <h2>{{ recipe().name }}</h2>
    <ng-content />
  </wm-card>`,
  styles: [
    `
      h2 {
        font-size: 1.2em;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `,
  ],
})
export class RecipePreview {
  recipe = input.required<Recipe>();
}
