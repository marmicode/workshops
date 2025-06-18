export const recipeRouteHelper = {
  SEARCH: 'search',
  RECIPE_DETAIL: 'recipe',

  search() {
    return ['/', this.SEARCH];
  },

  recipe(id: string) {
    return ['/', this.RECIPE_DETAIL, id];
  },
};
