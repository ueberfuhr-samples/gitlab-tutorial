import {Difficulty} from "../../../models/difficulty.model";
import {Recipe} from "../../../models/recipe.model";

export const emptyRecipe = () => ({
  id: '',
  name: '',
  img: '',
  servings: 0,
  lastEdited: new Date(),
  difficulty: Difficulty.EASY,
  duration: 0,
  ingredients: [],
  preparation: '',
} as Recipe)
