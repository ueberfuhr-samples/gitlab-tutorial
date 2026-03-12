import {Component, input} from '@angular/core';
import {MatChipsModule} from "@angular/material/chips";
import {Recipe} from "../../models/recipe.model";
import {MatIcon} from "@angular/material/icon";
import {Difficulty} from "../../models/difficulty.model";

@Component({
  selector: 'app-recipe-info-list',
  imports: [MatChipsModule, MatIcon],
  templateUrl: './recipe-info-list.component.html'
})
export class RecipeInfoListComponent {
  public recipe = input.required<Recipe>();

  protected getDifficultyLabel(difficulty: Difficulty): string {
    switch (difficulty) {
      case Difficulty.EASY:
        return 'einfach';
      case Difficulty.MEDIUM:
        return 'mittel';
      case Difficulty.HARD:
        return 'schwer';
    }
  }

}
