import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Card, Picture } from '../shared/card.ng';
import type { Recipe } from './recipe';
import { FeatureToggles } from '../feature-toggles';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-preview-v1',
  imports: [Card],
  template: `<wm-card [picture]="picture()">
    <h2 data-testid="recipe-name">{{ recipe().name }}</h2>
    <div class="actions"><ng-content /></div>
  </wm-card>`,
  styles: `
    h2 {
      font-size: 1.2em;
      font-style: italic;
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
export class RecipePreviewV1 {
  recipe = input.required<Recipe>();

  protected picture = computed<Picture>(() => ({
    uri: this.recipe().pictureUri,
    alt: `Picture of ${this.recipe().name}`,
  }));
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-preview-v2',
  imports: [Card],
  template: `<wm-card [picture]="picture()">
    <h2 data-testid="recipe-name">{{ recipe().name }}</h2>
    <div class="actions"><ng-content /></div>
  </wm-card>`,
})
export class RecipePreviewV2 {
  recipe = input.required<Recipe>();

  protected picture = computed<Picture>(() => ({
    uri: this.recipe().pictureUri,
    alt: `Picture of ${this.recipe().name}`,
  }));
}

@Component({
  selector: 'wm-recipe-preview',
  imports: [RecipePreviewV1, RecipePreviewV2],
  template: `
    @switch (version()) {
      @case ('v2') {
        <wm-recipe-preview-v2 [recipe]="recipe()" />
      }
      @default {
        <wm-recipe-preview-v1 [recipe]="recipe()" />
      }
    }
  `,
})
export class RecipePreview {
  recipe = input.required<Recipe>();
  featureToggles = inject(FeatureToggles);

  protected version = computed<string>(() => {
    return this.featureToggles.canSearchRecipes() ? 'v2' : 'v1';
  });
}
