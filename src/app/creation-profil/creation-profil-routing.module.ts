import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreationProfilPage } from './creation-profil.page';

const routes: Routes = [
  {
    path: '',
    component: CreationProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreationProfilPageRoutingModule {}
