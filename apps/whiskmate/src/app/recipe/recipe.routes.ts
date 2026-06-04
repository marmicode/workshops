import { Route } from '@angular/router';
import { recipeSearchPath } from './recipe.paths';

export const recipeRoutes: Route[] = [
  {
    path: recipeSearchPath,
    loadComponent: () =>
      import('./recipe-search.ng').then((m) => m.RecipeSearch),
  },
];
