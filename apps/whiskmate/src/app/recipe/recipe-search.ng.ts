import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { Catalog } from '../shared/catalog.ng';
import type { RecipeFilterCriteria } from './recipe-filter-criteria';
import { RecipeFilterForm } from './recipe-filter-form.ng';
import { RecipeRepository } from './recipe-repository/recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [RecipeFilterForm, Catalog],
  template: `
    <wm-recipe-filter-form (filterChange)="onFilterChange($event)" />

    @if (searchState() === 'idle') {
      <p data-testid="search-prompt">Search for recipes to get started.</p>
    }

    <wm-catalog>
      @if (searchState() === 'empty') {
        <p data-testid="empty-state">No recipes found</p>
      }
      @if (searchState() === 'results') {
        @for (recipe of recipes(); track recipe.id) {
          <h2 data-testid="recipe-name">{{ recipe.name }}</h2>
        }
      }
    </wm-catalog>
  `,
})
export class RecipeSearch {
  private _repository = inject(RecipeRepository);

  private _criteria = signal<RecipeFilterCriteria | undefined>(undefined);

  protected recipes = toSignal(
    toObservable(this._criteria).pipe(
      switchMap((criteria) =>
        criteria ? this._repository.search(criteria) : of([]),
      ),
    ),
    { initialValue: [] },
  );

  protected searchState = computed<'idle' | 'results' | 'empty'>(() => {
    if (this._criteria() === undefined) {
      return 'idle';
    }
    return this.recipes().length > 0 ? 'results' : 'empty';
  });

  onFilterChange(criteria: RecipeFilterCriteria) {
    this._criteria.set(criteria);
  }
}
