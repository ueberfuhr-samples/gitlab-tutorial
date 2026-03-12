import {AppComponent} from './app.component';
import {provideRouter} from '@angular/router';
import {describe, it, expect, beforeEach} from 'vitest';
import {createComponentFactory, Spectator} from "@ngneat/spectator/vitest";

describe('AppComponent', () => {

  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [provideRouter([])],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render title', () => {
    expect(spectator.query('.nav-headline')?.textContent).toContain(
      'Meine Rezepte'
    );
  });
});
