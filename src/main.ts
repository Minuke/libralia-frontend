import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initAuth } from 'app/auth.init';

bootstrapApplication(AppComponent, appConfig).then(async (appRef) => {
  const injector = appRef.injector;
  await initAuth(injector);
});
