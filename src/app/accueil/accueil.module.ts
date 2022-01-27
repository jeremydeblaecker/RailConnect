import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccueilPage } from './accueil.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AccueilPageRoutingModule } from './accueil-routing.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AccueilPageRoutingModule
  ],
  declarations: [AccueilPage]
})

export class AccueilPageModule {

  constructor(private http: HttpClient) {
    this.readAPI('https://api.sncf.com/v1/coverage/sncf/stop_points/stop_point:SNCF:87753764:Train/places_nearby?key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
    .subscribe((data) => {
    console.log(data);
    this.stationData.nom = data['places_nearby']['1']['name'];
    this.stationData.distance = data['places_nearby']['1']['distance'];
    console.log(this.stationData.nom);
    console.log(this.stationData.distance);  
    });
  }

  readAPI(URL: string) {
    return this.http.get(URL);
  }

  stationData = {
    nom: '',
    distance: ''
  };


}