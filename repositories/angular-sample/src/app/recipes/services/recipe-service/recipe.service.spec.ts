vi.mock('@app/environments', () => ({
  environment: {
    apiBaseUrl: '',
    production: false,
  },
}));

import {RecipeService} from './recipe.service';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import { Recipe, RecipeDraft, RecipeUpdate } from '../../models/recipe.model';
import { RecipeRequestDto } from './models/recipe-dto.model';
import { IngredientUnit } from '../../models/ingredient-unit.model';
import { Difficulty } from '../../models/difficulty.model';
import {createServiceFactory, SpectatorService} from "@ngneat/spectator/vitest";

describe(RecipeService.name, () => {

  const baseUrl = 'http://localhost:3000/';
  let spectator: SpectatorService<RecipeService>;
  let service: RecipeService;
  let httpMock: HttpTestingController;

  const TEST_RECIPE_ID: Recipe['id'] = '1';

  const createService = createServiceFactory({
    service: RecipeService,
    providers: [provideHttpClientTesting()]
  });

  const TEST_RECIPE_DRAFT: RecipeDraft = {
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
        unit: IngredientUnit.GRAMS,
        quantity: 50,
        name: 'Hartweizengrieß',
      },
      {
        unit: IngredientUnit.CUBES,
        quantity: 0.25,
        name: 'Hefe',
      },
      {
        unit: IngredientUnit.MILLILITERS,
        quantity: 160,
        name: 'Wasser, lauwarm',
      },
      {
        unit: IngredientUnit.TEASPOONS,
        quantity: 1,
        name: 'Salz',
      },
      {
        unit: IngredientUnit.TABLESPOONS,
        quantity: 2,
        name: 'Olivenöl',
      },
      {
        unit: IngredientUnit.PIECES,
        quantity: 4,
        name: 'Romatomaten',
      },
      {
        unit: IngredientUnit.TEASPOONS,
        quantity: 1,
        name: 'Oregano, getrocknet',
      },
      {
        unit: IngredientUnit.TEASPOONS,
        quantity: 0.25,
        name: 'Salz',
      },
      {
        unit: IngredientUnit.PIECES,
        quantity: 1,
        name: 'Büffelmozzarella',
      },
    ],
    preparation: `
            Zunächst für den Pizzateig Mehl, Grieß und Salz gründlich vermengen. Die Hefe im warmen Wasser auflösen, 5 Minuten ruhen lassen and dann zur Mehlmischung geben. Die Zutaten so lange mit dem Knethaken des Handrührers, in der Küchenmaschine oder von Hand kneten, bis ein elastischer Teig entsteht, das dauert ungefähr 10 Minuten. Falls der Teig zu fest sein sollte einfach noch etwas warmes Wasser zugeben, wenn der Teig zu flüssig ist, etwas Mehl hinzugeben. Erst dann das Olivenöl unterkneten.\n
            Den Teig in Frischhaltefolie wickeln oder unter einem Geschirrtuch mindestens 30 Minuten gehen lassen. Der Teig lässt sich ebenfalls hervorragend im Hefeteig-Programm eines Brotbackautomaten zubereiten.\n
            In der Zwischenzeit die Roma-Tomaten quer halbieren und über einer feinen Reibe bis auf die Schale abreiben. Das überschüssige Wasser aus den Tomaten durch ein feines Sieb abgießen, so dass nur der Tomatensaft und das Innere der Tomaten übrig bleiben. Diese Tomaten nach Geschmack mit etwas Salz würzen.\n
            Ein Backblech ordentlich mit gutem, erhitzbarem Olivenöl bepinseln und den Ofen auf 250°C Ober- und Unterhitze vorheizen. Den Teig nochmals von Hand durchkneten und auf einem bemehlten Brett etwa in Größe des Blechs von der Mitte nach außen ausrollen. Der Teig sollte dabei etwa 3 mm dick ausgerollt werden.\n
            Den ausgerollten Teig auf das Blech geben und nur hauchdünn (das ist wichtig!) mit den Tomaten bestreichen. Mit dem Oregano bestreuen. Die Chorizo in feine Stücke schneiden und auf der Pizza verteilen. Den Mozzarella von Hand in Stücke reißen und über die Pizza streuen.\n
            Auf der zweiten Einschubleiste von unten etwa 10 Minuten backen. Wer einen Pizzastein hat, kann sich das Backen auf dem Blech natürlich sparen und stattdessen zwei Runde Pizzen aus dem Teig formen.
        `,
  };

  const TEST_RECIPE_UPDATE: RecipeUpdate = {
    id: TEST_RECIPE_ID,
    ...TEST_RECIPE_DRAFT,
  };

  const TEST_RECIPE_REQUEST_DTO: RecipeRequestDto = {
    name: 'Pizza',
    img: '/recipe_pictures/pizza.jpg',
    servings: 4,
    duration: 30,
    difficulty: 'medium',
    ingredients: [
      {
        unit: 'grams',
        quantity: 200,
        name: 'Weizenmehl Type 550',
      },
      {
        unit: 'grams',
        quantity: 50,
        name: 'Hartweizengrieß',
      },
      {
        unit: 'cubes',
        quantity: 0.25,
        name: 'Hefe',
      },
      {
        unit: 'milliliters',
        quantity: 160,
        name: 'Wasser, lauwarm',
      },
      {
        unit: 'teaspoons',
        quantity: 1,
        name: 'Salz',
      },
      {
        unit: 'tablespoons',
        quantity: 2,
        name: 'Olivenöl',
      },
      {
        unit: 'pieces',
        quantity: 4,
        name: 'Romatomaten',
      },
      {
        unit: 'teaspoons',
        quantity: 1,
        name: 'Oregano, getrocknet',
      },
      {
        unit: 'teaspoons',
        quantity: 0.25,
        name: 'Salz',
      },
      {
        unit: 'pieces',
        quantity: 1,
        name: 'Büffelmozzarella',
      },
    ],
    preparation: `
            Zunächst für den Pizzateig Mehl, Grieß und Salz gründlich vermengen. Die Hefe im warmen Wasser auflösen, 5 Minuten ruhen lassen and dann zur Mehlmischung geben. Die Zutaten so lange mit dem Knethaken des Handrührers, in der Küchenmaschine oder von Hand kneten, bis ein elastischer Teig entsteht, das dauert ungefähr 10 Minuten. Falls der Teig zu fest sein sollte einfach noch etwas warmes Wasser zugeben, wenn der Teig zu flüssig ist, etwas Mehl hinzugeben. Erst dann das Olivenöl unterkneten.\n
            Den Teig in Frischhaltefolie wickeln oder unter einem Geschirrtuch mindestens 30 Minuten gehen lassen. Der Teig lässt sich ebenfalls hervorragend im Hefeteig-Programm eines Brotbackautomaten zubereiten.\n
            In der Zwischenzeit die Roma-Tomaten quer halbieren und über einer feinen Reibe bis auf die Schale abreiben. Das überschüssige Wasser aus den Tomaten durch ein feines Sieb abgießen, so dass nur der Tomatensaft und das Innere der Tomaten übrig bleiben. Diese Tomaten nach Geschmack mit etwas Salz würzen.\n
            Ein Backblech ordentlich mit gutem, erhitzbarem Olivenöl bepinseln und den Ofen auf 250°C Ober- und Unterhitze vorheizen. Den Teig nochmals von Hand durchkneten und auf einem bemehlten Brett etwa in Größe des Blechs von der Mitte nach außen ausrollen. Der Teig sollte dabei etwa 3 mm dick ausgerollt werden.\n
            Den ausgerollten Teig auf das Blech geben und nur hauchdünn (das ist wichtig!) mit den Tomaten bestreichen. Mit dem Oregano bestreuen. Die Chorizo in feine Stücke schneiden und auf der Pizza verteilen. Den Mozzarella von Hand in Stücke reißen und über die Pizza streuen.\n
            Auf der zweiten Einschubleiste von unten etwa 10 Minuten backen. Wer einen Pizzastein hat, kann sich das Backen auf dem Blech natürlich sparen und stattdessen zwei Runde Pizzen aus dem Teig formen.
        `,
  };

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    httpMock = spectator.inject(HttpTestingController);
  });

  it('should call "recipes" endpoint with HTTP.GET Method', () => {
    service
      .getAllRecipes()
      .subscribe();
    const req = httpMock
      .expectOne(`${baseUrl}recipes`);
    expect(req.request.method)
      .toBe('GET');
  });

  it('should call "recipes/:id" endpoint with HTTP.GET Method', () => {
    service
      .getRecipe(TEST_RECIPE_ID)
      .subscribe();
    const req = httpMock
      .expectOne(`${baseUrl}recipes/${TEST_RECIPE_ID}`);
    expect(req.request.method).toBe('GET');
  });

  it('should call "recipes" endpoint with HTTP.POST Method and recipeDto in the Body', () => {
    service
      .createRecipe(TEST_RECIPE_DRAFT)
      .subscribe();

    const req = httpMock
      .expectOne(`${baseUrl}recipes`);
    expect(req.request.method)
      .toBe('POST');
    req.flush(TEST_RECIPE_REQUEST_DTO);

    expect(req.request.body)
      .toEqual(TEST_RECIPE_REQUEST_DTO);
  });

  it('should call "recipes/:id" endpoint with HTTP.PUT Method and recipeDto in the Body', () => {
    service
      .updateRecipe(TEST_RECIPE_UPDATE)
      .subscribe();
    const req = httpMock
      .expectOne(`${baseUrl}recipes/${TEST_RECIPE_UPDATE.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(TEST_RECIPE_REQUEST_DTO);

    expect(req.request.body).toEqual(TEST_RECIPE_REQUEST_DTO);
  });

  it('should call "recipes/:id" endpoint with HTTP.DELETE Method', () => {
    service
      .deleteRecipe(TEST_RECIPE_ID)
      .subscribe();
    const req = httpMock
      .expectOne(`${baseUrl}recipes/${TEST_RECIPE_ID}`);

    expect(req.request.method)
      .toBe('DELETE');
  });
});
