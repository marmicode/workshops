import { TestBed } from '@angular/core/testing';
import { describe } from 'vitest';
import { RecipeRepository } from './recipe-repository';
import { applyRecipeRepositoryContract } from './recipe-repository.contract';

describe(RecipeRepository.name, () => {
  applyRecipeRepositoryContract(async () => ({
    repository: TestBed.inject(RecipeRepository),
  }));
});
