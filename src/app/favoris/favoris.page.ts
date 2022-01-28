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

  ) {
    this.storage.get('actualNav').then((actualNav) => {
      if(actualNav){
        this.oldNav = actualNav;
      }
      console.log('actualNav', actualNav);
      this.storage.set('actualNav','tabs/favoris');
    });
  }

  ngOnInit()
  {
    console.log('this.oldNav', this.oldNav);

  }

  favoris()
  {
    const ionStar = (document.getElementById('ionStarfav') as HTMLIonIconElement);
    if (ionStar.name === 'star-outline' ){
      ionStar.name = 'star';
      ionStar.classList.add('gold');

    }
    else{
      ionStar.name = 'star-outline';
      ionStar.classList.remove('gold');

    }
  }

  goToCreationProfil()
  {
    this.navCtrl.navigateRoot('creation-profil');
  }



}
