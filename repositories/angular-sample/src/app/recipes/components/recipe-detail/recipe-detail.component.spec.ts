import {routes} from '../../../app.routes';
import {provideLocationMocks} from '@angular/common/testing';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {of} from 'rxjs';
import {Location} from '@angular/common';
import {UrlSegment} from '@angular/router';
import {RecipeDetailComponent} from './recipe-detail.component';
import {createRecipeServiceMock} from "../../../../test/app";
import {Recipe} from '../../models/recipe.model';
import {Difficulty} from '../../models/difficulty.model';
import {IngredientUnit} from '../../models/ingredient-unit.model';
import {RecipeService} from '../../services/recipe-service/recipe.service';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {createRoutingFactory, SpectatorRouting} from "@ngneat/spectator/vitest";

describe(RecipeDetailComponent.name, () => {

  let spectator: SpectatorRouting<RecipeDetailComponent>;

  const TEST_RECIPE: Recipe = {
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
      }
    ],
    preparation: 'Backen...',
    lastEdited: new Date(),
  };

  const createComponent = createRoutingFactory({
    component: RecipeDetailComponent,
    stubsEnabled: false,
    routes: [...routes],
    providers: [
      provideLocationMocks(),
      {
        provide: RecipeService,
        useValue: createRecipeServiceMock(TEST_RECIPE)
      },
      MatDialog,
    ],
  });

  beforeEach(async () => {
    spectator = createComponent({
      props: {
        recipeId: TEST_RECIPE.id,
      },
    });
    spectator.setRouteUrl([
      new UrlSegment('recipes', {recipeId: TEST_RECIPE.id}),
    ]);
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should call getRecipe from RecipeService', () => {
    const recipeService = spectator.inject(RecipeService);
    const recipeServiceSpy = vi.spyOn(recipeService, 'getRecipe');

    // Trigger input change to trigger toObservable(recipeId) logic
    spectator.setInput('recipeId', TEST_RECIPE.id);

    expect(recipeServiceSpy).toHaveBeenCalledWith(TEST_RECIPE.id);
  });

  it('should call deleteRecipe from RecipeService', () => {
    const dialog = spectator.inject(MatDialog);
    vi.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as unknown as MatDialogRef<unknown, unknown>);

    const recipeService = spectator.inject(RecipeService);
    const recipeServiceSpy = vi.spyOn(recipeService, 'deleteRecipe');

    spectator.click('app-delete-button > button');

    expect(recipeServiceSpy).toHaveBeenCalledTimes(1);
    expect(recipeServiceSpy).toHaveBeenCalledWith(TEST_RECIPE.id);
  });

  it('should navigate after delete', async () => {
    const dialog = spectator.inject(MatDialog);
    vi.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as unknown as MatDialogRef<unknown, unknown>);

    spectator.click('app-delete-button > button');

    await spectator.fixture.whenStable();

    expect(spectator.inject(Location).path()).toBe(`/recipes`);
  });

});
