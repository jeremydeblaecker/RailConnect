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

  ) {
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

  ngOnInit()
  {
    // console.log('this.oldNav', this.oldNav);

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
          if(i == 0)
            this.listFavoris.pop();
          else
            this.listFavoris.splice(i,i);

        }
        
      }
    }
    this.storage.set('listFavoris', this.listFavoris);
    console.log("listFavoris: ",this.listFavoris);
  }

  goToCreationProfil(connexion)
  {
    this.storage.set('actualNav','tabs/favoris');
    this.storage.set('connexion',connexion);

    this.navCtrl.navigateRoot('creation-profil');

  }



}
