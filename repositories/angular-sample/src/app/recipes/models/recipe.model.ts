import {Difficulty} from "./difficulty.model";
import {Ingredient} from "./ingredient.model";

export interface Recipe {
  id: string;
  name: string;
  /** URL des Rezeptbildes, absolut oder relativ. */
  img?: string;
  servings: number;
  lastEdited: Date;
  /** Zubereitungszeit in Minuten. */
  duration: number;
  difficulty: Difficulty;
  ingredients: Ingredient[];
  preparation: string;
}

/** Ein Rezept-Entwurf aus einer Benutzereingabe (vor dem Speichern, ohne ReadOnly-Attribute). */
export type RecipeDraft = Omit<Recipe, 'id' | 'lastEdited'>;

/** Ein Rezept aus einem Formular zum Aktualisieren (mit ID, aber ohne lastEdited). */
export type RecipeUpdate = Omit<Recipe, 'lastEdited'>;

