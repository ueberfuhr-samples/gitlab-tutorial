import {Component, input} from '@angular/core';

@Component({
  selector: 'app-recipe-preparation',
  templateUrl: './recipe-preparation.component.html'
})
export class RecipePreparationComponent {
  public preparation = input.required<string>();
}
