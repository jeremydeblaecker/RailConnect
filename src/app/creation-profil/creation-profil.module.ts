import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreationProfilPageRoutingModule } from './creation-profil-routing.module';

import { CreationProfilPage } from './creation-profil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreationProfilPageRoutingModule
  ],
  declarations: [CreationProfilPage]
})
export class CreationProfilPageModule {}
