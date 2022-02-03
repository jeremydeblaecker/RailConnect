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

  stationData = {
      nom: '',
      distance: '',
      id: ''
    };

  constructor(
    private http: HttpClient,
    private storage: Storage,
    public navCtrl: NavController,

  ) {
     this.storage.set('actualNav','tabs/accueil');
    }

  ngOnInit()
  {

    this.readAPI('https://api.sncf.com/v1/coverage/sncf/coord/5.443867%3B43.524823/places_nearby?key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
    .subscribe((data) => {
      console.log(data);
      this.data = data;

      this.stationData.nom = this.data.places_nearby[2].stop_point.name;
      this.stationData.distance = this.data.places_nearby[2].distance;
      this.stationData.id = this.data.places_nearby[2].id;

      console.log('this.stationData.nom: ', this.stationData.nom);
      console.log('this.stationData.distance: ', this.stationData.distance);
      console.log('this.stationData.id: ', this.stationData.id);

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
        ionStar.classList.add('gold');
      }
      else{
        ionStar.name = 'star-outline';
        ionStar.classList.remove('gold');

      }
    }

    goToGare(){
      this.storage.set('titreGare', { 'titre' :this.stationData.nom, 'id' :this.stationData.id});
      this.navCtrl.navigateRoot('tabs/detail-gare');
    }

  }






