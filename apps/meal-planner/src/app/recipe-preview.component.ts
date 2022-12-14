import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from './recipe';
import { NgIf } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'mp-recipe-preview',
  imports: [NgIf],
  template: `
    <div *ngIf="recipe">{{ recipe.name }}</div>
    <div *ngIf="!recipe">...</div>
  `,
})
export class RecipePreviewComponent {
  @Input() recipe?: Recipe;
}
