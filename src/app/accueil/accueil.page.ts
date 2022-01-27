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

    this.readAPI('https://api.sncf.com/v1/coverage/sncf/coord/5.443867%3B43.524823/places_nearby?key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
    .subscribe((data) => {
    console.log(data);
    this.stationData.nom = data['places_nearby']['2']['name'];
    this.stationData.distance = data['places_nearby']['2']['distance'];
    this.stationData.id = data['places_nearby']['2']['id'];
    console.log(this.stationData.nom);
    console.log(this.stationData.distance);
    console.log(this.stationData.id);   
    });
    }

    readAPI(URL: string) {
      return this.http.get(URL);
    }
    
    stationData = {
      nom: '',
      distance: '',
      id: ''
    };

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

  
  



