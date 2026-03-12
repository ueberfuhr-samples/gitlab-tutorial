import {Component, inject} from '@angular/core';
import {RecipeListItemComponent} from '../recipe-list-item/recipe-list-item.component';
import {RecipeService} from "../../services/recipe-service/recipe.service";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeListItemComponent],
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent {
  protected recipes = toSignal(inject(RecipeService).getAllRecipes());
}
