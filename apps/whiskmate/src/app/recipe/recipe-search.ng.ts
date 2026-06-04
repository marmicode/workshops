import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Catalog } from '../shared/catalog.ng';
import {
  createDefaultRecipeFilterCriteria,
  type RecipeFilterCriteria,
} from './recipe-filter-criteria';
import { RecipeFilterForm } from './recipe-filter-form.ng';
import { RecipePreview } from './recipe-preview.ng';
import { RecipeRepository } from './recipe-repository/recipe-repository';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-search',
  imports: [RecipeFilterForm, Catalog, RecipePreview],
  template: `
    <wm-recipe-filter-form (filterChange)="onFilterChange($event)" />

    <wm-catalog>
      @for (recipe of recipes.value(); track recipe.id) {
        <wm-recipe-preview [recipe]="recipe" />
      } @empty {
        <p data-testid="empty-state">No recipes found</p>
      }
    </wm-catalog>
  `,
})
export class RecipeSearch {
  private _criteria = signal<RecipeFilterCriteria>(
    createDefaultRecipeFilterCriteria(),
  );
  private _repository = inject(RecipeRepository);

  protected recipes = rxResource({
    params: this._criteria,
    stream: ({ params }) => this._repository.search(params),
  });

  onFilterChange(criteria: RecipeFilterCriteria) {
    this._criteria.set(criteria);
  }
}
