import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailGarePageRoutingModule } from './detail-gare-routing.module';

import { DetailGarePage } from './detail-gare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailGarePageRoutingModule
  ],
  declarations: [DetailGarePage]
})
export class DetailGarePageModule {}
