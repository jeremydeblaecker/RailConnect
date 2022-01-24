import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-detail-gare',
  templateUrl: './detail-gare.page.html',
  styleUrls: ['./detail-gare.page.scss'],
})
export class DetailGarePage implements OnInit {
  actualNav;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.storage.get('actualNav').then((nav) => {
      console.log('actualNav: ', nav);
      this.actualNav= nav;
    });
  }

  backButton(){
    this.navCtrl.navigateForward(this.actualNav);
  }
}
