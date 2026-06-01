import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import type { Recipe } from '../recipe/recipe';
import { RecipePreview } from '../recipe/recipe-preview.ng';
import { Catalog } from '../shared/catalog.ng';
import { MealPlanStore } from './meal-plan-store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-meal-plan',
  imports: [Catalog, MatButtonModule, RecipePreview],
  template: `
    @if (meals().length === 0) {
      <p class="empty">No meals planned yet.</p>
    } @else {
      <wm-catalog>
        @for (meal of meals(); track meal.id) {
          <wm-recipe-preview [recipe]="meal">
            <button mat-raised-button (click)="remove(meal)">REMOVE</button>
          </wm-recipe-preview>
        }
      </wm-catalog>
    }
  `,
  styles: `
    :host {
      display: block;
      padding-top: 1rem;
      text-align: center;
    }

    .empty {
      margin-top: 2rem;
    }
  `,
})
export class MealPlan {
  protected meals = inject(MealPlanStore).meals;

  private _mealPlanStore = inject(MealPlanStore);

  protected remove(meal: Recipe): void {
    this._mealPlanStore.remove(meal);
  }
}
