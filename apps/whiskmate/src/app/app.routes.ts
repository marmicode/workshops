import { Route } from '@angular/router';
import { mealPlanPaths } from './meal-plan/meal-plan.paths';
import { recipePaths } from './recipe/recipe.paths';

export const appRoutes: Route[] = [
  {
    path: recipePaths.RECIPE_SEARCH_PATH,
    loadComponent: () =>
      import('./recipe/recipe-search.ng').then((m) => m.RecipeSearch),
  },
  {
    path: mealPlanPaths.MEAL_PLAN_PATH,
    loadComponent: () =>
      import('./meal-plan/meal-plan.ng').then((m) => m.MealPlan),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: recipePaths.RECIPE_SEARCH_PATH,
  },
];
