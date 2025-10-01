import { RecipeRepositoryDef } from './recipe-repository';
import { lastValueFrom } from 'rxjs';

export function verifyRecipeRepositoryContract(
  setUp: () => {
    recipeRepository: RecipeRepositoryDef;
  },
) {
  it('finds a burger', async () => {
    const { recipeRepository } = setUp();

    expect(
      await lastValueFrom(recipeRepository.search({ keywords: 'bur' })),
    ).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'Burger' })]),
    );
  });

  it('returns empty array if no recipe is found', async () => {
    const { recipeRepository } = setUp();

    expect(
      await lastValueFrom(
        recipeRepository.search({ keywords: 'a-recipe-that-does-not-exist' }),
      ),
    ).toEqual([]);
  });
}
