import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideRecipeRepositoryFake } from './recipe/recipe-repository.fake';
import { RecipeRepositoryFake } from './recipe/recipe-repository.fake';
import { recipeMother } from './testing/recipe.mother';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZonelessChangeDetection(),
    ...(environment.useFakes
      ? [
          provideRecipeRepositoryFake(),
          provideAppInitializer(() => {
            inject(RecipeRepositoryFake).setRecipes([
              recipeMother.withBasicInfo('Burger').build(),
              recipeMother.withBasicInfo('Salad').build(),
            ]);
          }),
        ]
      : []),
  ],
};
