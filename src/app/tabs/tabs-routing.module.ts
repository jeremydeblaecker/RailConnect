import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('../accueil/accueil.module').then(m => m.AccueilPageModule)
      },
      {
        path: 'detail-gare',
        loadChildren: () => import('../detail-gare/detail-gare.module').then( m => m.DetailGarePageModule)
      },
      {
        path: 'favoris',
        loadChildren: () => import('../favoris/favoris.module').then(m => m.FavorisPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/accueil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
