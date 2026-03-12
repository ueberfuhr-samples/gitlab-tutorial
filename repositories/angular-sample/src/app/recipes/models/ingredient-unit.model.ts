/**
 * Einheiten für Portionen von Zutaten.
 */
export enum IngredientUnit {
  /** Generische Einheit für Artikel wie Eier oder Tomaten. */
  PIECES,
  /** Gewicht in Gramm (g). */
  GRAMS,
  /** Gewicht in Kilogramm (kg). */
  KILOGRAMS,
  /** Volumen in Millilitern (ml). */
  MILLILITERS,
  /** Volumen in Litern (l). */
  LITERS,
  /** Kleiner Löffel (TL/Teelöffel). */
  TEASPOONS,
  /** Großer Löffel (EL/Esslöffel). */
  TABLESPOONS,
  /** Standard-Tassenvolumen. */
  CUPS,
  /** Für Knoblauchzehen. */
  CLOVES,
  /** Sehr kleine Menge (Prise). */
  PINCHES,
  /** Für vorverpackte Artikel wie Backpulver. */
  PACKAGES,
  /** Für Konserven. */
  CANS,
  /** Für Flaschenflüssigkeiten. */
  BOTTLES,
  /** Für Artikel wie Brot oder Schinken. */
  SLICES,
  /** Für Kräuter wie Rosmarin. */
  SPRIGS,
  /** Für Artikel wie Sellerie. */
  STALKS,
  /** Für Artikel in Würfelform, z. B. frische Hefe oder Brühwürfel. */
  CUBES
}
