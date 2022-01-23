import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailGarePage } from './detail-gare.page';

const routes: Routes = [
  {
    path: '',
    component: DetailGarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailGarePageRoutingModule {}
