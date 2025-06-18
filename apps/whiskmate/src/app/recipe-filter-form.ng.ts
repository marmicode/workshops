import {
  ChangeDetectionStrategy,
  Component,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-recipe-filter-form',
  imports: [FormsModule],
  template: `<form>
    <input
      [(ngModel)]="keywords"
      type="text"
      name="keywords"
      placeholder="Search recipes..."
    />
    <button type="submit">SEARCH</button>
  </form>`,
})
export class RecipeForm {
  keywords = model<string | null>(null);
}
