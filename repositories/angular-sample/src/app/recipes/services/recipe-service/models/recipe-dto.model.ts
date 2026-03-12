import {DifficultyDto} from "./difficulty-dto.model";
import {IngredientDto} from "./ingredient-dto.model";

export interface RecipeDto {
  id: string;
  name: string;
  /** URL des Rezeptbildes, absolut oder relativ. */
  img?: string;
  servings: number;
  lastEdited: string;
  /** Zubereitungszeit in Minuten. */
  duration: number;
  difficulty: DifficultyDto;
  ingredients: IngredientDto[];
  preparation: string;
}

/** DTO für das Erstellen oder Aktualisieren eines Rezepts (ohne ReadOnly-Attribute). */
export type RecipeRequestDto = Omit<RecipeDto, 'id' | 'lastEdited'>;

