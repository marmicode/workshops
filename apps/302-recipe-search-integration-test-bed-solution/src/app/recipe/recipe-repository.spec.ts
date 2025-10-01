import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RecipeRepository } from './recipe-repository';
import { verifyRecipeRepositoryContract } from './recipe-repository.contract';

describe(RecipeRepository.name, () => {
  verifyRecipeRepositoryContract(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });

    const recipeRepository = TestBed.inject(RecipeRepository);

    return {
      recipeRepository,
    };
  });
});
