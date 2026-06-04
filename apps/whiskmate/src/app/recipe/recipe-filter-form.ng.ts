import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import type { RecipeFilterCriteria } from './recipe-filter-criteria';

/**
 * @deprecated 🚧 work in progress
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-filter-form',
  template: `RecipeFilterForm - 🚧 work in progress`,
})
export class RecipeFilterForm {
  filterChange = output<RecipeFilterCriteria>();
}
