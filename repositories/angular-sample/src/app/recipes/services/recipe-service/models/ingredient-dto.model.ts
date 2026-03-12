import {IngredientUnitDto} from "./ingredient-unit-dto.model";

export interface IngredientDto {
  unit: IngredientUnitDto;
  quantity: number;
  name: string;
}
