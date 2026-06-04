import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  createDefaultRecipeFilterCriteria,
  createRecipeFilterCriteria,
  type RecipeFilterCriteria,
} from './recipe-filter-criteria';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter-form',
  imports: [ReactiveFormsModule],
  template: `<form [formGroup]="form">
      <label>
        Keywords
        <input name="keywords" formControlName="keywords" />
      </label>
      <button type="submit" (click)="submit()">Search</button>
    </form>`,
})
export class RecipeFilterForm {
  filterChange = output<RecipeFilterCriteria>();

  protected form = new FormGroup({
    keywords: new FormControl('', { nonNullable: true }),
  });

  protected submit() {
    this.filterChange.emit(
      createRecipeFilterCriteria({
        ...createDefaultRecipeFilterCriteria(),
        keywords: this.form.controls.keywords.value,
      }),
    );
  }
}
