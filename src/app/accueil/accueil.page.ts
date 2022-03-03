import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar'

@Component({
  selector: 'app-accueil',
  templateUrl: 'accueil.page.html',
  styleUrls: ['accueil.page.scss']
})
export class AccueilPage implements OnInit{

  @Input() listFavoris: any [] = [];

  data: any;
  // listFavoris: any [] = [];
  color: any= '#DA2700';
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
    StatusBar.setOverlaysWebView({ overlay: true });
    // StatusBar.show()
    // StatusBar.setBackgroundColor('black');
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

    this.storage.get('listFavoris').then((listFavoris) => {
      if(listFavoris)
        this.listFavoris = listFavoris;
      console.log("listFavoris: ",listFavoris);
    });

  }

  ionViewWillEnter() {
    this.storage.get('listFavoris').then((listFavoris) => {
      if (listFavoris)
        this.listFavoris = listFavoris;
      console.log("listFavoris: ",listFavoris);
    });
  }

  readAPI(URL: string) {
    return this.http.get(URL);
  }

  addFavoris(){
    const ionStar = (<HTMLIonIconElement>document.getElementById('ionStar'));
    const tabId = ionStar.parentElement.id.split(' ');
    if (ionStar.name === 'star-outline' ){
      ionStar.name = 'star';
      ionStar.classList.add('gold');
      this.listFavoris.push(
        {
          "id": tabId[0],
          "nom": tabId[1]
        }
      )
    }
    else{
      ionStar.name = 'star-outline';
      ionStar.classList.remove('gold');
      for (let i = 0; i < this.listFavoris.length; i++)
      {
        if(this.listFavoris[i].id === tabId[0])
        {
          this.listFavoris[i].nom;
          this.listFavoris.splice(i);
        }
      }
    }
    this.storage.set('listFavoris', this.listFavoris);
    console.log("listFavoris: ",this.listFavoris);
  }

  goToGare(){
    this.storage.set('actualNav','tabs/accueil');
    this.storage.set('titreGare', { 'titre' :this.stationData.nom, 'id' :this.stationData.id});
    this.navCtrl.navigateRoot('tabs/detail-gare');
  }

  searchGare(input){
    this.readAPI('https://api.sncf.com/v1/coverage/sncf/places?q='+input+'&key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
    .subscribe((data) => {
      

    })
  }

}






