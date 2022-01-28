import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Deeplinks } from '@ionic-native/deeplinks';
import { AccueilPage } from './app/accueil/accueil.page';
import { CreationProfilPage } from './app/creation-profil/creation-profil.page';
import { DetailGarePage } from './app/detail-gare/detail-gare.page';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
