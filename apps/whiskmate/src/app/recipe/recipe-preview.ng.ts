import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Card, Picture } from '../shared/card.ng';
import type { Recipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-preview',
  imports: [Card],
  template: `<wm-card [picture]="picture()">
    <h2 data-testid="recipe-name">{{ recipe().name }}</h2>
    <div class="actions"><ng-content /></div>
  </wm-card>`,
  styles: `
    h2 {
      font-size: 1.2em;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .actions {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }
  `,
})
export class RecipePreview {
  recipe = input.required<Recipe>();

  protected picture = computed<Picture>(() => ({
    uri: this.recipe().pictureUri,
    alt: `Picture of ${this.recipe().name}`,
  }));
}
