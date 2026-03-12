import {inject, Injectable} from '@angular/core';
import {Recipe, RecipeDraft, RecipeUpdate} from '../../models/recipe.model';
import {map, Observable} from "rxjs";
import {mapRecipeDraftToRecipeRequestDto, mapRecipeDtoToRecipe} from "./mappings/recipe-dto.mapping";
import {HttpClient} from "@angular/common/http";
import {RecipeDto} from "./models/recipe-dto.model";
import {Environment, ENVIRONMENT} from "@app/environments";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly environment = inject<Environment>(ENVIRONMENT);
  private readonly baseUrl = `${this.environment.apiBaseUrl}/recipes`;
  private readonly httpClient = inject(HttpClient);

  public getAllRecipes(): Observable<Recipe[]> {
    return this.httpClient
      .get<RecipeDto[]>(this.baseUrl)
      .pipe(
        map(arr => arr.map(mapRecipeDtoToRecipe)),
      );
  }

  public getRecipe(id: Recipe['id']): Observable<Recipe> {
    return this.httpClient
      .get<RecipeDto>(`${this.baseUrl}/${id}`)
      .pipe(
        map(mapRecipeDtoToRecipe),
      );
  }

  public createRecipe(recipe: RecipeDraft): Observable<Recipe> {
    const recipeDto = mapRecipeDraftToRecipeRequestDto(recipe)
    return this.httpClient
      .post<RecipeDto>(this.baseUrl, recipeDto)
      .pipe(
        map(mapRecipeDtoToRecipe),
      );
  }

  public updateRecipe(recipe: RecipeUpdate): Observable<Recipe> {
    const recipeDto = mapRecipeDraftToRecipeRequestDto(recipe);
    return this.httpClient
      .put<RecipeDto>(`${this.baseUrl}/${recipe.id}`, recipeDto)
      .pipe(
        map(mapRecipeDtoToRecipe),
      );
  }

  public deleteRecipe(recipeId: Recipe['id']): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${recipeId}`);
  }
}
