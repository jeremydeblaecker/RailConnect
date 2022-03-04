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
  listGares: any [] = [];


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

  ) {}

  ngOnInit()
  {
    this.storage.set('actualNav','tabs/accueil');
    StatusBar.setOverlaysWebView({ overlay: true });

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
    this.deleteStar();
    this.storage.get('listFavoris').then((listFavoris) => {
      if (listFavoris){
        this.listFavoris = listFavoris;
        this.searchFavoris();
      }
      console.log("listFavoris: ",listFavoris);
    });
    
  }

  readAPI(URL: string) {
    return this.http.get(URL);
  }

  addFavoris(id){
    const ionStar = (<HTMLIonIconElement>document.getElementById(id));
    const tabId = id.split('--');
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
          if(i == 0 && this.listFavoris.length == 1)
            console.log("pop: ", this.listFavoris.pop());
          else if (i == 0)
            console.log("shift: ", this.listFavoris.shift());
          else
            console.log("splice: ", this.listFavoris.splice(i,1));
        }
      }
    }
    this.storage.set('listFavoris', this.listFavoris);
    console.log("listFavoris: ",this.listFavoris);
  }

  goToGare(id){
    const tabId = id.split('*');
    console.log("nom: ", tabId[1]);
    console.log("id: ", tabId[0]);
    this.storage.set('actualNav','tabs/accueil');
    this.storage.set('titreGare', { 'titre' : tabId[1], 'id' : tabId[0]});
    this.navCtrl.navigateRoot('tabs/detail-gare');
  }

  searchGare(input)
  {
    if(input){
      this.listGares = [];
      // console.log("🚀 ~ file: accueil.page.ts ~ line 115 ~ AccueilPage ~ searchGare ~ input", input)
      this.readAPI('https://api.sncf.com/v1/coverage/sncf/places?q='+input+'&count=500&type%5B%5D=stop_area&key=0dca33cf-7a3b-4c16-9baf-534bbdaf98b6')
      .subscribe((data) => {
        console.log("🚀 ~ file: accueil.page.ts ~ line 120 ~ AccueilPage ~ .subscribe ~ data", data);
        let listData = data['places'];
        for (let i = 0; i < listData.length; i++)
        {
          this.listGares.push(
            {
              nom: listData[i].stop_area.name,
              id: listData[i].id
            }
          )
        }
        console.log("🚀 ~ file: accueil.page.ts ~ line 128 ~ AccueilPage ~ .subscribe ~ this.listGares", this.listGares);
        setTimeout(() => {
          this.searchFavoris();
        }, 1);
      })
    }
  }

  searchFavoris(){
    for (let n = 0; n < this.listFavoris.length; n++)
    {
      for (let i = 0; i < this.listGares.length; i++)
      {
        const ionStar = (<HTMLIonIconElement>document.getElementById(this.listGares[i].id + "--" + this.listGares[i].nom));
        // console.log("id: ",this.listGares[i].id + "--" + this.listGares[i].nom);
        // console.log("ionStar: ", ionStar);

        if(this.listGares[i].id === this.listFavoris[n].id)
        {
          ionStar.name = 'star';
          ionStar.classList.add('gold');
        }
      }
    }
  }

  deleteStar(){
    for (let i = 0; i < this.listGares.length; i++)
    {
      const ionStar = (<HTMLIonIconElement>document.getElementById(this.listGares[i].id + "--" + this.listGares[i].nom));
      if(ionStar.name == 'star'){
        ionStar.name = 'star-outline';
        ionStar.classList.remove('gold');
      }
    }
  }

}






