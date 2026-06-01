const MEAL_PLAN_PATH = 'meal-plan' as const;

export const mealPlanPaths = {
  MEAL_PLAN_PATH,
  mealPlanRoute: () => ['/', MEAL_PLAN_PATH],
};
