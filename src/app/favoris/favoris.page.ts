import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-favoris',
  templateUrl: 'favoris.page.html',
  styleUrls: ['favoris.page.scss']
})
export class FavorisPage implements OnInit {

  connecte: any;
  oldNav: any;
  listFavoris: any [];

  constructor(
    public navCtrl: NavController,
    private storage: Storage,

  ) {}

  ngOnInit()
  {
    this.storage.get('actualNav').then((actualNav) => {
      if(actualNav){
        this.oldNav = actualNav;
      }
      // console.log('actualNav', actualNav);
      this.storage.set('actualNav','tabs/favoris');
    });

    this.storage.get('checkConnecte').then((connecte) => {
        this.connecte = connecte;
        // console.log("connecte: ",connecte);
    });
  }

  ionViewWillEnter() { // appeler à chaque entré
    this.storage.get('listFavoris').then((listFavoris) => {
      if (listFavoris)
        this.listFavoris = listFavoris;
      console.log("listFavoris: ",listFavoris);
    });
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

  goToCreationProfil(connexion)
  {
    this.storage.set('actualNav','tabs/favoris');
    this.storage.set('connexion',connexion);

    this.navCtrl.navigateRoot('creation-profil');

  }



}
