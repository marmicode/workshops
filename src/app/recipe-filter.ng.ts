import { Component, output } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';
import { RecipeCriteria } from './recipe-criteria';

@Component({
  selector: 'app-recipe-filter',
  imports: [ReactiveFormsModule],
  template: ` <form [formGroup]="form" (ngSubmit)="triggerCriteriaSubmit()">
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
  protected form = new FormGroup({
    keywords: new FormControl<string | null>(null),
    maxIngredients: new FormControl<number | null>(null),
    maxSteps: new FormControl<number | null>(null),
  });
  criteriaChange = outputFromObservable(
    this.form.valueChanges.pipe(map(convertToCriteria)),
  );
  criteriaSubmit = output<RecipeCriteria>();

  protected triggerCriteriaSubmit() {
    this.criteriaSubmit.emit(convertToCriteria(this.form.value));
  }
}

function convertToCriteria(value: Partial<RecipeCriteria>): RecipeCriteria {
  return {
    keywords: value.keywords ?? null,
    maxIngredients: value.maxIngredients ?? null,
    maxSteps: value.maxSteps ?? null,
  };
}
