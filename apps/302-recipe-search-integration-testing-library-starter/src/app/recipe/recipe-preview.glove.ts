import { screen, within } from '@testing-library/dom';

export const recipePreviewGlove = {
  async findAllRecipePreviews() {
    const recipePreviewEls = await screen.findAllByTestId('recipe-preview');
    return recipePreviewEls.map((el) => {
      return {
        findName: () => within(el).findByRole('heading', { level: 2 }),
      };
    });
  },
};
