import {Recipe, RecipeDto} from "../models/recipe.model";

export function mapRecipeDtoToRecipe(recipeDto: RecipeDto): Recipe {
  return {
    id: recipeDto.id,
    name: recipeDto.name,
    img: recipeDto.img,
    servings: recipeDto.portions,
    lastEdited: recipeDto.lastEdited,
    duration: recipeDto.duration,
    difficulty: recipeDto.level_of_difficulty,
    ingredients: [...recipeDto.ingredients],
    preparation: recipeDto.preparation
  }
}

export function mapRecipeToRecipeDto(recipe: Recipe): RecipeDto {
  return {
    id: recipe.id,
    name: recipe.name,
    img: recipe.img,
    portions: recipe.servings,
    lastEdited: recipe.lastEdited,
    duration: recipe.duration,
    level_of_difficulty: recipe.difficulty,
    ingredients: [...recipe.ingredients],
    preparation: recipe.preparation
  }
};
