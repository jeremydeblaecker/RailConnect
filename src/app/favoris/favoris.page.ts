import { Component } from '@angular/core';

@Component({
  selector: 'app-favoris',
  templateUrl: 'favoris.page.html',
  styleUrls: ['favoris.page.scss']
})
export class FavorisPage {

  constructor() {}

  favoris(){
    const ionStar = (<HTMLIonIconElement>document.getElementById('ionStarfav'));
    if (ionStar.name === 'star-outline' ){
      ionStar.name = 'star';
    }
    else{
      ionStar.name = 'star-outline';
    }
  }

}
