import { Route } from '@angular/router';
import { recipeSearchPath } from './recipe/recipe.paths';

export const appRoutes: Route[] = [
  {
    path: recipeSearchPath,
    loadComponent: () =>
      import('./recipe/recipe-search.ng').then((m) => m.RecipeSearch),
  },
];
