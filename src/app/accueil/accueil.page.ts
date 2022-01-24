import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss']
})
export class AccueilPage implements OnInit{

  data: any;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.storage.set('actualNav','tabs/accueil');

    this.readAPI('https://api.sncf.com/v1/coverage/sncf/stop_points/stop_point:SNCF:87753764:Train/places_nearby?key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
      .subscribe((data) => {
      console.log('data: ', data);

      this.data = data;
      console.log('nom gare: ',this.data.places_nearby[0].name);

      this.storage.set('DataApi',data);
      this.storage.get('DataApi').then((val) => {
        console.log('DataApi', val);
      });
    });

  }

  readAPI(URL: string) {
    return this.http.get(URL);
  }

  favoris(){
    const ionStar = (<HTMLIonIconElement>document.getElementById('ionStar'));
    if (ionStar.name === 'star-outline' ){
      ionStar.name = 'star';
    }
    else{
      ionStar.name = 'star-outline';
    }
  }

  goToGare(){
    this.navCtrl.navigateForward('tabs/detail-gare');
  }

}
