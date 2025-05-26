export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
}

export function createRecipe(recipe: Recipe) {
  return recipe;
}
