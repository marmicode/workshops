import { Route } from '@angular/router';
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

import { Component } from '@angular/core';

