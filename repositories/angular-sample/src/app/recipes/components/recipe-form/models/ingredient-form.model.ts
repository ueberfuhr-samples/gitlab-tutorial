import {FormControl} from "@angular/forms";
import {IngredientUnit} from "../../../models/ingredient-unit.model";

export interface IngredientForm {
  name: FormControl<string>;
  unit: FormControl<IngredientUnit>;
  quantity: FormControl<number>;
}
