import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-filter',
  imports: [ReactiveFormsModule],
  template: ` <form [formGroup]="form" (ngSubmit)="triggerCriteriaChange()">
    <input type="text" formControlName="keywords" placeholder="Keywords" />
    <input
      type="number"
      formControlName="maxIngredients"
      placeholder="Max Ingredients"
    />
    <input type="number" formControlName="maxSteps" placeholder="Max Steps" />
    <button type="reset">RESET</button>
    <button type="submit">SEARCH</button>
  </form>`,
})
export class RecipeFilter {
  criteriaChange = output<RecipeCriteria>();

  protected form = new FormGroup({
    keywords: new FormControl<string | null>(null),
    maxIngredients: new FormControl<number | null>(null),
    maxSteps: new FormControl<number | null>(null),
  });

  protected triggerCriteriaChange() {
    this.criteriaChange.emit({
      keywords: this.form.value.keywords ?? null,
      maxIngredients: this.form.value.maxIngredients ?? null,
      maxSteps: this.form.value.maxSteps ?? null,
    });
  }
}

export interface RecipeCriteria {
  keywords: string | null;
  maxIngredients: number | null;
  maxSteps: number | null;
}
