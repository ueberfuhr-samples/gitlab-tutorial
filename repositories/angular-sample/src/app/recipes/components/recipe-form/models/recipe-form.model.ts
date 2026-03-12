import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Difficulty} from "../../../models/difficulty.model";
import {IngredientForm} from "./ingredient-form.model";

export interface RecipeForm {
  name: FormControl<string>;
  servings: FormControl<number>;
  duration: FormControl<number>;
  difficulty: FormControl<Difficulty>;
  ingredients: FormArray<FormGroup<IngredientForm>>;
  preparation: FormControl<string>;
}
