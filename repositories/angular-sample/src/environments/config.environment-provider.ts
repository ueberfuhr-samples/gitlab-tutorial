import {HttpClient} from "@angular/common/http";
import {
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  provideAppInitializer
} from "@angular/core";
import {tap} from "rxjs";
import {Environment} from "./config.model";

export const ENVIRONMENT = new InjectionToken<Environment>('Environment Variable Configuration');

export function provideEnvironmentConfig(): EnvironmentProviders {
  const environment: Environment = {
    production: false,
    apiBaseUrl: 'http://localhost:3000'
  };
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      const http = inject(HttpClient);
      return http.get<Environment>('/config.json')
        .pipe(
          tap(config => {
            environment.apiBaseUrl = config.apiBaseUrl || environment.apiBaseUrl;
            environment.production = config.production || environment.production;
          })
        );
    }),
    {provide: ENVIRONMENT, useValue: environment}
  ]);
}
