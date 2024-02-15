import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Signal, computed, inject, input, signal } from '@angular/core';
import { suspensify } from '@jscutlery/operators';
import { rxComputed } from '@jscutlery/rx-computed';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'app-recipe',
  imports: [JsonPipe],
  template: `
  @if(isPending()) {
    <p>Loading...</p>
  } @else {
   <h1>Recipe: {{recipe()?.value?.name}}</h1>
  }

  @if(hasErrors()) {
    <p>Error: {{errors() | json}}</p>
  }
  `
})
export class RecipeComponent {
  recipeId = input.required<string>();
  contract = resolveContract();
  recipe = resolveRecipe(this.recipeId);

  isPending = computed(() => (this.contract().pending || this.recipe()?.pending));
  errors = computed(() => ({
    ...this.contract().error ? {contract: this.contract().error} : {},
    ...this.recipe()?.error ? {recipe: this.recipe()?.error} : {}
  }))
  hasErrors = () => Object.entries(this.errors()).length > 0;
}

interface Recipe {
  id: string;
  name: string;
}

function resolveRecipe(recipeId: Signal<string>) {
  const http = inject(HttpClient);
  return rxComputed(() => http.get<Recipe>(`https://recipes-api.marmicode.io/recipes/${recipeId()}`).pipe(suspensify({strict: false})));
}

function resolveContract() {
  const contract = signal({
    pending: true,
    error: null
  });
  setTimeout(() => contract.set({error: null, pending: false}), 1000);
  return contract;
}