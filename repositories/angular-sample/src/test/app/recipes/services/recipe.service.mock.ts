import {Mocked, vi} from 'vitest';
import {EMPTY, of} from 'rxjs';
import {Recipe, RecipeDraft, RecipeUpdate,} from '../../../../app/recipes/models/recipe.model';
import {RecipeService} from '../../../../app/recipes/services/recipe-service/recipe.service';

/**
 * Erstellt einen typsicheren Mock für den RecipeService.
 * Durch die Verwendung von Mocked<RecipeService> wird sichergestellt,
 * dass alle Methoden des Services vorhanden sind und die korrekten Signaturen haben.
 */
export function createRecipeServiceMock(
  ...initialRecipes: Recipe[]
): Mocked<RecipeService> {
  let recipes: Recipe[] = [...initialRecipes];

  return {
    getAllRecipes: vi.fn().mockImplementation(() => of([...recipes])),

    getRecipe: vi.fn().mockImplementation((id: Recipe['id']) => {
      const recipe = recipes.find((r) => r.id === id);
      return recipe ? of(recipe) : EMPTY;
    }),

    createRecipe: vi.fn().mockImplementation((recipeDraft: RecipeDraft) => {
      const newRecipe: Recipe = {
        ...recipeDraft,
        id: crypto.randomUUID(),
        lastEdited: new Date(),
      };
      recipes.push(newRecipe);
      return of(newRecipe);
    }),

    updateRecipe: vi.fn().mockImplementation((recipeUpdate: RecipeUpdate) => {
      const index = recipes.findIndex((r) => r.id === recipeUpdate.id);

      if (index !== -1) {
        const updatedRecipe: Recipe = {
          ...recipes[index],
          ...recipeUpdate,
          lastEdited: new Date(),
        };
        recipes[index] = updatedRecipe;
        return of(updatedRecipe);
      }

      return EMPTY;
    }),

    deleteRecipe: vi.fn().mockImplementation((recipeId: Recipe['id']) => {
      recipes = recipes.filter((r) => r.id !== recipeId);
      return of(undefined);
    }),
  } as unknown as Mocked<RecipeService>;
}
