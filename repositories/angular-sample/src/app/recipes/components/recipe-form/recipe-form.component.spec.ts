import {createRoutingFactory, SpectatorRouting,} from '@ngneat/spectator/vitest';
import {routes} from '../../../app.routes';
import {provideLocationMocks} from '@angular/common/testing';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {RecipeFormComponent} from './recipe-form.component';
import {Difficulty} from "../../models/difficulty.model";
import {Recipe, RecipeUpdate} from "../../models/recipe.model";
import {IngredientUnit} from "../../models/ingredient-unit.model";
import {createRecipeServiceMock} from "../../../../test/app";
import {RecipeService} from '../../services/recipe-service/recipe.service';

describe(RecipeFormComponent.name, () => {

  let spectator: SpectatorRouting<RecipeFormComponent>;

  const TEST_RECIPE_UPDATE: RecipeUpdate = {
    id: '1',
    name: 'Pizza',
    img: '/recipe_pictures/pizza.jpg',
    servings: 4,
    duration: 30,
    difficulty: Difficulty.MEDIUM,
    ingredients: [
      {
        unit: IngredientUnit.GRAMS,
        quantity: 200,
        name: 'Weizenmehl Type 550',
      },
      {
        unit: IngredientUnit.PIECES,
        quantity: 2,
        name: 'Eier',
      }
    ],
    preparation: 'Backen...',
  };

  const TEST_RECIPE: Recipe = {
    ...TEST_RECIPE_UPDATE,
    lastEdited: new Date(),
  };

  const createComponent = createRoutingFactory({
    component: RecipeFormComponent,
    stubsEnabled: false,
    routes: [...routes],
    providers: [
      provideLocationMocks(),
      {
        provide: RecipeService,
        useValue: createRecipeServiceMock(TEST_RECIPE),
      },
    ],
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('new recipe', () => {
    it('should have header text "Neues Rezept"', () => {
      expect(spectator.query<HTMLElement>('h1')?.textContent).toEqual(
        'Neues Rezept'
      );
    });
  });

  describe('recipe to edit', () => {
    it('should have header text "Rezept bearbeiten"', () => {
      spectator.setInput('recipeId', TEST_RECIPE.id);
      expect(spectator.query<HTMLElement>('h1')?.textContent).toEqual(
        'Rezept bearbeiten'
      );
    });

    it('should call getRecipe from RecipeService', () => {
      const recipeService = spectator.inject(RecipeService);
      const recipeServiceSpy = vi.spyOn(recipeService, 'getRecipe');
      spectator.setInput('recipeId', TEST_RECIPE.id);
      expect(recipeServiceSpy).toHaveBeenCalledWith(TEST_RECIPE.id);
    });

    it('should prefill the form', () => {
      spectator.setInput('recipeId', TEST_RECIPE.id);
      const nameInput =
        spectator.query<HTMLInputElement>('input[formControlName="name"]') ??
        undefined;

      expect(nameInput?.value).toEqual(TEST_RECIPE.name);
    });
  });

  describe('form validation', () => {
    describe('name field', () => {
      it('should show error when no value provided', () => {
        const nameInput =
          spectator.query<HTMLInputElement>('input[formControlName="name"]') ??
          undefined;
        spectator.focus(nameInput);
        spectator.blur(nameInput);

        expect(
          spectator.query<HTMLElement>('mat-error > app-form-error > span')
            ?.textContent
        ).toEqual('Bitte gib einen Wert ein.');
      });

      it('should show error when value is to short', () => {
        const nameInput =
          spectator.query<HTMLInputElement>('input[formControlName="name"]') ??
          undefined;
        spectator.focus(nameInput);
        spectator.typeInElement('', nameInput);
        spectator.blur(nameInput);

        expect(
          spectator
            .query<HTMLElement>('mat-error > app-form-error > span')
            ?.textContent
        )
          .toEqual('Bitte gib einen Wert ein.');
      });

      it('should be valid', () => {
        const nameInput =
          spectator.query<HTMLInputElement>('input[formControlName="name"]') ??
          undefined;
        spectator.focus(nameInput);
        spectator.typeInElement('test', nameInput);
        spectator.blur(nameInput);

        expect(
          spectator.query<HTMLElement>('mat-error > app-form-error > span')
            ?.textContent
        ).toBeFalsy();
      });
    });
  });

  describe('submit', () => {
    it('should call updateRecipe from RecipeService', () => {
      const recipeService = spectator.inject(RecipeService);
      const recipeServiceSpy = vi.spyOn(recipeService, 'updateRecipe');

      spectator.setInput('recipeId', TEST_RECIPE.id);
      spectator.click('button[type="submit"]');

      expect(recipeServiceSpy).toHaveBeenCalledTimes(1);
      expect(recipeServiceSpy).toHaveBeenCalledWith(TEST_RECIPE_UPDATE);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });
});
