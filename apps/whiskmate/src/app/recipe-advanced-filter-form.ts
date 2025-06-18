import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
} from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { debounceTime, EMPTY, map } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-advanced-filter-form',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <form [formGroup]="form">
      <input
        type="text"
        formControlName="keywords"
        placeholder="Search recipes..."
      />
      <input
        type="number"
        formControlName="maxCookingTime"
        placeholder="Max Cooking Time (min)"
      />
      <input type="number" formControlName="maxSteps" placeholder="Max Steps" />
      <ul>
        @for (tagCtrl of tagsCtrlArray.controls; track tagCtrl) {
          <li>
            <input
              type="text"
              [formControl]="tagCtrl"
              placeholder="Tag (optional)"
            />
          </li>
        }
      </ul>
      <button (click)="addTag()" type="button">ADD TAG</button>
      <button (click)="reset()" type="reset">RESET</button>
    </form>

    @if (hasKeywordsRequiredError()) {
      <div>Keywords are required.</div>
    }

    {{ tagsCtrlArray.errors | json }}
  `,
  styles: `
    input.ng-invalid.ng-dirty {
      background: indianred;
    }
  `,
})
export class RecipeAdvancedFilterForm {
  protected tagsCtrlArray = new FormArray<FormControl<string | null>>(
    [],
    [noDuplicatesValidator],
  );
  protected keywordsCtrl = new FormControl('', [
    Validators.minLength(3),
    Validators.required,
  ]);
  protected form = new FormGroup({
    keywords: this.keywordsCtrl,
    /* Cooking time in minutes. */
    maxCookingTime: new FormControl<number | null>(null),
    maxSteps: new FormControl<number | null>(null),
    cook: new FormGroup({
      name: new FormControl<string | null>(null),
      restaurant: new FormControl<string | null>(null),
    }),
    tags: this.tagsCtrlArray,
  });

  /* This is an example of the heavy lifting that can be required to
   * track form control changes and errors in a reactive way with signals.
   * Meanwhile, the Angular team ships signal forms.
   * Generally, this is not necessary and making conditions in functions
   * or in the template is enough because changes happen after user interaction
   * which triggers synchronization even on OnPush components. */
  protected hasKeywordsRequiredError = toSignal(
    this.keywordsCtrl.valueChanges.pipe(
      map(
        () => this.keywordsCtrl.dirty && this.keywordsCtrl.hasError('required'),
      ),
    ),
  );

  filterChange = outputFromObservable(
    this.form.valueChanges.pipe(debounceTime(50)),
  );

  addTag() {
    this.tagsCtrlArray.push(new FormControl(''));
  }

  reset() {
    this.tagsCtrlArray.clear();
  }
}

const noDuplicatesValidator: ValidatorFn = (ctrl: AbstractControl) => {
  if (!(ctrl instanceof FormArray)) {
    throw new Error('Expected FormArray for noDuplicatesValidator');
  }

  const values = ctrl.controls.map((c) => c.value).filter((v) => v.length > 0);
  const hasDuplicates = new Set(values).size !== values.length;

  if (hasDuplicates) {
    return {
      noDuplicates: {
        message: 'Tags must be unique.',
      },
    };
  }
  return null;
};
