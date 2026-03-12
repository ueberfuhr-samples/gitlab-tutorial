import {IngredientUnit} from "./ingredient-unit.model";

export interface Ingredient {
  unit: IngredientUnit;
  quantity: number;
  name: string;
}
