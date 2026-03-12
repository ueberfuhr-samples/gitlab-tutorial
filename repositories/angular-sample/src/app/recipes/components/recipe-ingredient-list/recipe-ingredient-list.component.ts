import {Component, input} from '@angular/core';
import {Ingredient} from "../../models/ingredient.model";
import {MatListModule} from "@angular/material/list";
import {IngredientUnit} from '../../models/ingredient-unit.model';

@Component({
  selector: 'app-recipe-ingredient-list',
  imports: [MatListModule],
  templateUrl: './recipe-ingredient-list.component.html'
})
export class RecipeIngredientListComponent {
  public servings = input.required<number>();
  public ingredients = input.required<Ingredient[]>();

  protected getIngredientUnitLabel(unit: IngredientUnit): string {
    switch (unit) {
      case IngredientUnit.PIECES:
        return 'Stück';
      case IngredientUnit.GRAMS:
        return 'g';
      case IngredientUnit.KILOGRAMS:
        return 'kg';
      case IngredientUnit.MILLILITERS:
        return 'ml';
      case IngredientUnit.LITERS:
        return 'l';
      case IngredientUnit.TEASPOONS:
        return 'TL';
      case IngredientUnit.TABLESPOONS:
        return 'EL';
      case IngredientUnit.CUPS:
        return 'Tasse(n)';
      case IngredientUnit.CLOVES:
        return 'Zehe(n)';
      case IngredientUnit.PINCHES:
        return 'Prise(n)';
      case IngredientUnit.PACKAGES:
        return 'Pkg.';
      case IngredientUnit.CANS:
        return 'Dose(n)';
      case IngredientUnit.BOTTLES:
        return 'Flasche(n)';
      case IngredientUnit.SLICES:
        return 'Scheibe(n)';
      case IngredientUnit.SPRIGS:
        return 'Zweig(e)';
      case IngredientUnit.STALKS:
        return 'Stange(n)';
      case IngredientUnit.CUBES:
        return 'Würfel';
      default:
        throw new Error(`Unknown ingredient unit: ${unit}`);
    }
  }
}
