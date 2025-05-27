import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Recipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-preview',
  template: `
    <h2>{{ recipe().name }}</h2>
    <button (click)="remove.emit()">REMOVE</button>
  `,
  styles: `
  :host {
    display: block;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 10px;
  }
  `,
})
export class RecipePreview {
  recipe = input.required<Recipe>();
  remove = output<void>();
}
