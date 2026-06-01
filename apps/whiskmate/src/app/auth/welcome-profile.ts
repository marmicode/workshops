export interface WelcomeProfile {
  fullName: string;
  preferredName: string;
  country: string;
  city: string;
  householdSize: number | null;
  cookingExperience: string;
  primaryDiet: string;
  favoriteCuisine: string;
  weeklyMealsCooked: number | null;
  shoppingDay: string;
  referralSource: string;
  goals: string;
  termsAccepted: boolean;
}

export function createEmptyWelcomeProfile(): WelcomeProfile {
  return {
    fullName: '',
    preferredName: '',
    country: '',
    city: '',
    householdSize: null,
    cookingExperience: '',
    primaryDiet: '',
    favoriteCuisine: '',
    weeklyMealsCooked: null,
    shoppingDay: '',
    referralSource: '',
    goals: '',
    termsAccepted: false,
  };
}
