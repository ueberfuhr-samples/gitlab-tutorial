import {Component, inject, input, signal, WritableSignal} from '@angular/core';
import {RecipeService} from "../../services/recipe-service/recipe.service";
import {emptyRecipe} from "./models/empty-recipe";
import {Recipe} from '../../models/recipe.model';
import {toObservable} from "@angular/core/rxjs-interop";
import {distinctUntilChanged, switchMap} from "rxjs";
import {RecipeInfoListComponent} from "../recipe-info-list/recipe-info-list.component";
import {RecipeIngredientListComponent} from "../recipe-ingredient-list/recipe-ingredient-list.component";
import {RecipePreparationComponent} from "../recipe-preparation/recipe-preparation.component";
import {Router, RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {DeleteButtonComponent} from "@app/shared";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton} from "@angular/material/button";

@Component({
  selector: 'app-recipe-detail',
  imports: [
    RecipeInfoListComponent,
    RecipeIngredientListComponent,
    RecipePreparationComponent,
    MatDivider,
    DeleteButtonComponent,
    RouterLink,
    MatIcon,
    MatButton,
    MatAnchor
  ],
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent {
  public recipeId = input.required<string>();

  protected recipe: WritableSignal<Recipe> = signal(emptyRecipe());

  private readonly recipeService = inject(RecipeService);
  private readonly router = inject(Router);

  constructor() {
    toObservable(this.recipeId)
      .pipe(
        distinctUntilChanged(),
        switchMap(id => this.recipeService.getRecipe(id)),
      )
      .subscribe(recipe => this.recipe.set(recipe));
  }

  protected deleteRecipe(): void {
    this.recipeService
      .deleteRecipe(this.recipe().id)
      .subscribe(() => {
        this.router.navigate(['recipes']);
      });
  }
}
