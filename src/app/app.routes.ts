import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { RecipeComponent } from './recipe.component';


export const routes: Routes = [
  { 
    path: 'recipe/:recipeId',
    component: RecipeComponent
  },
  {
    path: '**',
    component: LandingComponent
  }
];
