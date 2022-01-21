import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss']
})
export class AccueilPage {

  data: any;

  constructor(private http: HttpClient) {
    this.readAPI('https://api.sncf.com/v1/coverage/sncf/stop_points/stop_point:SNCF:87753764:Train/places_nearby?key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
    .subscribe((data) => {
    console.log(data);
    this.data = data;
    // this.storage.set('DataApi',data);
    console.log('nom gare: ',this.data.places_nearby[0].name);
  });
  }

  readAPI(URL: string) {
    return this.http.get(URL);
  }
}
