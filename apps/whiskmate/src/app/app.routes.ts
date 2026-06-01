import { Route } from '@angular/router';
import {
  loginGuard,
  onboardedGuard,
  otpGuard,
  welcomeGuard,
} from './auth/auth.guard';
import { authPaths } from './auth/auth.paths';
import { mealPlanPaths } from './meal-plan/meal-plan.paths';
import { recipePaths } from './recipe/recipe.paths';

export const appRoutes: Route[] = [
  {
    path: authPaths.LOGIN_PATH,
    canActivate: [loginGuard],
    loadComponent: () => import('./auth/login.ng').then((m) => m.Login),
  },
  {
    path: authPaths.OTP_PATH,
    canActivate: [otpGuard],
    loadComponent: () => import('./auth/otp.ng').then((m) => m.Otp),
  },
  {
    path: authPaths.WELCOME_PATH,
    canActivate: [welcomeGuard],
    loadComponent: () => import('./auth/welcome.ng').then((m) => m.Welcome),
  },
  {
    path: recipePaths.RECIPE_SEARCH_PATH,
    canActivate: [onboardedGuard],
    loadComponent: () =>
      import('./recipe/recipe-search.ng').then((m) => m.RecipeSearch),
  },
  {
    path: mealPlanPaths.MEAL_PLAN_PATH,
    canActivate: [onboardedGuard],
    loadComponent: () =>
      import('./meal-plan/meal-plan.ng').then((m) => m.MealPlan),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: recipePaths.RECIPE_SEARCH_PATH,
  },
];
