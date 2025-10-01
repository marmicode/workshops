import { TestBed } from '@angular/core/testing';
import { RecipeRepositoryFake } from './recipe-repository.fake';
import { verifyRecipeRepositoryContract } from './recipe-repository.contract';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipeRepositoryFake.name, () => {
  verifyRecipeRepositoryContract(() => {
    const recipeRepository = TestBed.inject(RecipeRepositoryFake);

    recipeRepository.setRecipes([
      recipeMother.withBasicInfo('Burger').build(),
      recipeMother.withBasicInfo('Salad').build(),
    ]);

    return {
      recipeRepository,
    };
  });
});
