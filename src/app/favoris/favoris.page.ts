import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-favoris',
  templateUrl: 'favoris.page.html',
  styleUrls: ['favoris.page.scss']
})
export class FavorisPage implements OnInit {

  connecter: any = false;
  oldNav: any;

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
      this.storage.set('actualNav','tabs/favoris');
    });

  }

  favoris()
  {
    const ionStar = (document.getElementById('ionStarfav') as HTMLIonIconElement);
    if (ionStar.name === 'star-outline' ){
      ionStar.name = 'star';
    }
    else{
      ionStar.name = 'star-outline';
    }
  }

  goToCreationProfil()
  {
    this.navCtrl.navigateForward('creation-profil');
  }



}
