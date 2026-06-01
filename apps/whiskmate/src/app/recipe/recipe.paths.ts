export const RECIPE_SEARCH_PATH = 'search' as const;

export const recipePaths = {
  RECIPE_SEARCH_PATH,
  recipeSearchRoute: () => ['/', RECIPE_SEARCH_PATH],
};
