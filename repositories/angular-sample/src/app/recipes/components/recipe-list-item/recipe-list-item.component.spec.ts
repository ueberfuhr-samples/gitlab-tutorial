import {RecipeListItemComponent} from './recipe-list-item.component';
import {createRoutingFactory, SpectatorRouting,} from '@ngneat/spectator/vitest';
import {MatCardHeader, MatCardSubtitle, MatCardTitle,} from '@angular/material/card';
import {routes} from '../../../app.routes';
import {provideLocationMocks} from '@angular/common/testing';
import {Location} from '@angular/common';
import {beforeEach, describe, expect, it} from 'vitest';
import { Recipe } from '../../models/recipe.model';
import { Difficulty } from '../../models/difficulty.model';
import { IngredientUnit } from '../../models/ingredient-unit.model';

const baseUrl = 'http://localhost:3000';

describe(RecipeListItemComponent.name, () => {

  let spectator: SpectatorRouting<RecipeListItemComponent>;
  const createComponent = createRoutingFactory({
    component: RecipeListItemComponent,
    stubsEnabled: false,
    routes: [...routes],
    providers: [provideLocationMocks()],
  });

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

  beforeEach(() => {
    spectator = createComponent({
      props: {
        recipe: TEST_RECIPE,
      },
    });
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('header', () => {
    it('should render a mat-card-header', () => {
      expect(spectator.queryAll(MatCardHeader).length).toBe(1);
    });

    it('should render a img inside mat-card-header', () => {
      const img = spectator.query('mat-card-header > img') as HTMLImageElement;
      expect(img.src).toBe(`${baseUrl}${TEST_RECIPE.img}`);
    });

    it('should render a title inside mat-card-header', () => {
      expect(spectator.query(MatCardTitle)).toBeTruthy();
    });

    it('should render subtitle img inside mat-card-header', () => {
      expect(spectator.query(MatCardSubtitle)).toBeTruthy();
    });
  });

  describe('actions', () => {
    it('should render a link to recipe details', () => {
      const anchor = spectator.query<HTMLAnchorElement>('mat-card-actions > a');
      expect(anchor?.href).toBe(`${baseUrl}/recipes/${TEST_RECIPE.id}`);
    });

    it('should navigate to recipe details page', async () => {
      spectator.click('mat-card-actions > a');
      await spectator.fixture.whenStable();

      expect(spectator.inject(Location).path()).toBe(
        `/recipes/${TEST_RECIPE.id}`
      );
    });
  });
});
