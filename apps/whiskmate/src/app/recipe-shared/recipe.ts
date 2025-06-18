export interface Recipe {
  id: string;
  name: string;
  description: string;
  pictureUri: string;
  ingredients: string[];
  instructions: string[];
}

export function createRecipe(recipe: Recipe): Recipe {
  return recipe;
}
