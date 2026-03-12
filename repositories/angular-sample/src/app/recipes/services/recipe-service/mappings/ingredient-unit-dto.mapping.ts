import {IngredientUnit} from "../../../models/ingredient-unit.model";
import {IngredientUnitDto} from "../models/ingredient-unit-dto.model";

export function mapIngredientUnitDtoToIngredientUnit(unitDto: IngredientUnitDto): IngredientUnit {
  switch (unitDto) {
    case 'pieces':
      return IngredientUnit.PIECES;
    case 'grams':
      return IngredientUnit.GRAMS;
    case 'kilograms':
      return IngredientUnit.KILOGRAMS;
    case 'milliliters':
      return IngredientUnit.MILLILITERS;
    case 'liters':
      return IngredientUnit.LITERS;
    case 'teaspoons':
      return IngredientUnit.TEASPOONS;
    case 'tablespoons':
      return IngredientUnit.TABLESPOONS;
    case 'cups':
      return IngredientUnit.CUPS;
    case 'cloves':
      return IngredientUnit.CLOVES;
    case 'pinches':
      return IngredientUnit.PINCHES;
    case 'packages':
      return IngredientUnit.PACKAGES;
    case 'cans':
      return IngredientUnit.CANS;
    case 'bottles':
      return IngredientUnit.BOTTLES;
    case 'slices':
      return IngredientUnit.SLICES;
    case 'sprigs':
      return IngredientUnit.SPRIGS;
    case 'stalks':
      return IngredientUnit.STALKS;
    case 'cubes':
      return IngredientUnit.CUBES;
    default:
      throw new Error(`Unknown ingredient unit: ${unitDto}`);
  }
}

export function mapIngredientUnitToIngredientUnitDto(unit: IngredientUnit): IngredientUnitDto {
  switch (unit) {
    case IngredientUnit.PIECES:
      return 'pieces';
    case IngredientUnit.GRAMS:
      return 'grams';
    case IngredientUnit.KILOGRAMS:
      return 'kilograms';
    case IngredientUnit.MILLILITERS:
      return 'milliliters';
    case IngredientUnit.LITERS:
      return 'liters';
    case IngredientUnit.TEASPOONS:
      return 'teaspoons';
    case IngredientUnit.TABLESPOONS:
      return 'tablespoons';
    case IngredientUnit.CUPS:
      return 'cups';
    case IngredientUnit.CLOVES:
      return 'cloves';
    case IngredientUnit.PINCHES:
      return 'pinches';
    case IngredientUnit.PACKAGES:
      return 'packages';
    case IngredientUnit.CANS:
      return 'cans';
    case IngredientUnit.BOTTLES:
      return 'bottles';
    case IngredientUnit.SLICES:
      return 'slices';
    case IngredientUnit.SPRIGS:
      return 'sprigs';
    case IngredientUnit.STALKS:
      return 'stalks';
    case IngredientUnit.CUBES:
      return 'cubes';
  }
}
