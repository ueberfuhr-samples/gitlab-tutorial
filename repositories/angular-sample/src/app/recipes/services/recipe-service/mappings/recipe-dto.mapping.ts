import {Recipe, RecipeDraft} from "../../../models/recipe.model";
import {RecipeDto, RecipeRequestDto} from "../models/recipe-dto.model";
import {mapDifficultyDtoToDifficulty, mapDifficultyToDifficultyDto} from "./difficulty-dto.mapping";
import {mapIngredientDtoToIngredient, mapIngredientToIngredientDto} from "./ingredient-dto.mapping";

export function mapRecipeDtoToRecipe(recipeDto: RecipeDto): Recipe {
  return {
    id: recipeDto.id,
    name: recipeDto.name,
    img: recipeDto.img,
    servings: recipeDto.servings,
    lastEdited: new Date(recipeDto.lastEdited),
    duration: recipeDto.duration,
    difficulty: mapDifficultyDtoToDifficulty(recipeDto.difficulty),
    ingredients: recipeDto.ingredients.map(mapIngredientDtoToIngredient),
    preparation: recipeDto.preparation
  }
}

export function mapRecipeDraftToRecipeRequestDto(recipe: RecipeDraft): RecipeRequestDto {
  return {
    name: recipe.name,
    img: recipe.img,
    servings: recipe.servings,
    duration: recipe.duration,
    difficulty: mapDifficultyToDifficultyDto(recipe.difficulty),
    ingredients: recipe.ingredients.map(mapIngredientToIngredientDto),
    preparation: recipe.preparation
  }
}
