import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injectable,
  input,
  signal,
} from '@angular/core';
import { Recipe } from './recipe';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'wm-recipe-selector',
  template: `
    <ul>
      @for (recipe of recipesWithSelection(); track recipe.id) {
        <li>
          <input
            type="checkbox"
            [aria-label]="'Select ' + recipe.name"
            [checked]="recipe.selected"
            [name]="recipe.name"
            (input)="toggleRecipeSelection(recipe)"
          />
          {{ recipe.name }}
        </li>
      }
    </ul>
  `,
})
export class RecipeSelector {
  recipes = input<Recipe[]>([]);

  recipesWithSelection = computed(() =>
    this.recipes().map((recipe) => ({
      ...recipe,
      selected: this._recipeSelectionStore
        .selectedRecipeIds()
        .includes(recipe.id),
    })),
  );

  private _recipeSelectionStore = inject(RecipeSelectionStore);

  toggleRecipeSelection(recipe: Recipe) {
    const isSelected = this._recipeSelectionStore
      .selectedRecipeIds()
      .includes(recipe.id);
    if (isSelected) {
      this._recipeSelectionStore.unselectRecipe(recipe.id);
    } else {
      this._recipeSelectionStore.selectRecipe(recipe.id);
    }
  }
}

@Injectable({ providedIn: 'root' })
export class RecipeSelectionStore {
  private _selectedRecipeIds = signal<string[]>([]);

  selectedRecipeIds = this._selectedRecipeIds.asReadonly();

  selectRecipe(recipeId: string) {
    this._selectedRecipeIds.update((selectedRecipeIds) => [
      ...selectedRecipeIds,
      recipeId,
    ]);
  }

  unselectRecipe(recipeId: string) {
    this._selectedRecipeIds.update((selectedRecipeIds) =>
      selectedRecipeIds.filter((id) => id !== recipeId),
    );
  }
}
