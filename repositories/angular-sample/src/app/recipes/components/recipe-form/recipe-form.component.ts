import {Component, inject, input} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {Router} from "@angular/router";
import {FormErrorComponent, isDefined} from "@app/shared";
import {RecipeService} from '../../services/recipe-service/recipe.service';
import {Difficulty} from '../../models/difficulty.model';
import {Recipe, RecipeDraft, RecipeUpdate} from '../../models/recipe.model';
import {IngredientUnit} from '../../models/ingredient-unit.model';
import {toObservable} from "@angular/core/rxjs-interop";
import {distinctUntilChanged, filter, switchMap} from 'rxjs';
import {RecipeForm} from "./models/recipe-form.model";
import {difficultyOptions} from './models/difficulty-options.model';
import {ingredientUnitOptions} from './models/ingredient-unit-options.model';
import {IngredientForm} from './models/ingredient-form.model';

@Component({
  selector: 'app-recipe-form',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatError,
    FormErrorComponent,
    MatOption,
    MatSelect,
    MatIcon,
    CdkTextareaAutosize,
    MatIconButton,
    FormErrorComponent
  ],
  templateUrl: './recipe-form.component.html'
})
export class RecipeFormComponent {
  public recipeId = input<string>();

  protected recipeToEdit: Recipe | undefined;

  protected recipeForm: FormGroup<RecipeForm>;
  protected difficultyOptions = difficultyOptions;
  protected ingredientUnitOptions = ingredientUnitOptions;

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  constructor() {
    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      servings: [1, [Validators.required, Validators.min(1)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      difficulty: [Difficulty.EASY, [Validators.required]],
      ingredients: this.formBuilder.array([
        this.createIngredientFormGroup(),
        this.createIngredientFormGroup()
      ]),
      preparation: ['', [Validators.required, Validators.maxLength(2000)]]
    });

    toObservable(this.recipeId)
      .pipe(
        distinctUntilChanged(),
        filter(isDefined),
        switchMap(id => this.recipeService.getRecipe(id)),
      )
      .subscribe(recipe => {
        this.recipeToEdit = recipe;
        recipe
          .ingredients
          .forEach((_, index) => {
            if (index > 1) {
              this.recipeForm.controls.ingredients.push(this.createIngredientFormGroup());
            }
          });
        this.recipeForm.patchValue(recipe);
      });
  }

  private createIngredientFormGroup(): FormGroup<IngredientForm> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      unit: [IngredientUnit.PIECES],
      quantity: [1, [Validators.required, Validators.min(0.001)]],
    })
  }

  protected addIngredientFormGroup() {
    this.recipeForm.controls.ingredients.push(this.createIngredientFormGroup());
  }

  protected removeIngredientFormGroup(index: number) {
    this.recipeForm.controls.ingredients.removeAt(index);
  }

  protected submitForm() {
    if (this.recipeForm.invalid) {
      return;
    }

    if (this.recipeToEdit) {
      const {lastEdited, ...recipeWithoutLastEdited} = this.recipeToEdit;
      const recipe = {
        img: '/recipe_pictures/default.jpg',
        ...recipeWithoutLastEdited,
        ...this.recipeForm.getRawValue(),
      } as RecipeUpdate;
      this.recipeService
        .updateRecipe(recipe)
        .subscribe(() => {
          this.router.navigate(['recipes', recipe.id]);
        });
    } else {
      const recipe = {
        img: '/recipe_pictures/default.jpg',
        ...this.recipeForm.getRawValue(),
      } as RecipeDraft;
      this.recipeService
        .createRecipe(recipe)
        .subscribe(() => {
          this.router.navigate(['recipes']);
        });
    }
  }

}
