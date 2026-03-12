import {IngredientDto} from "../models/ingredient-dto.model";
import {Ingredient} from "../../../models/ingredient.model";
import {
  mapIngredientUnitDtoToIngredientUnit,
  mapIngredientUnitToIngredientUnitDto
} from "./ingredient-unit-dto.mapping";

export function mapIngredientDtoToIngredient(ingredientDto: IngredientDto): Ingredient {
  return {
    name: ingredientDto.name,
    quantity: ingredientDto.quantity,
    unit: mapIngredientUnitDtoToIngredientUnit(ingredientDto.unit)
  };
}

export function mapIngredientToIngredientDto(ingredient: Ingredient): IngredientDto {
  return {
    name: ingredient.name,
    quantity: ingredient.quantity,
    unit: mapIngredientUnitToIngredientUnitDto(ingredient.unit)
  };
}
