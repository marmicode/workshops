import { Route } from '@angular/router';
import { recipeSearchPath } from './recipe/recipe.paths';
import { recipeRoutes } from './recipe/recipe.routes';

@Component({
  template: `<p>Welcome</p>`,
})
export class Home {}

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
  ...recipeRoutes,
];

import { ChangeDetectionStrategy, Component } from '@angular/core';
