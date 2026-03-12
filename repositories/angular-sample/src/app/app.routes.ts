import {Routes} from '@angular/router';
import {RecipeListComponent} from './recipes/components/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipes/components/recipe-detail/recipe-detail.component';
import {RecipeFormComponent} from "./recipes/components/recipe-form/recipe-form.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    component: RecipeListComponent,
    title: 'Recipe List',
  },
  // must be placed before recipes/:recipeId for pattern matching to work
  {
    path: 'recipes/new',
    component: RecipeFormComponent,
    title: 'New Recipe',
  },
  {
    path: 'recipes/:recipeId',
    component: RecipeDetailComponent,
    title: 'Recipe Detail',
  },
  {
    path: 'recipes/edit/:recipeId',
    component: RecipeFormComponent,
    title: 'Edit Recipe',
  },
];
