import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-creation-profil',
  templateUrl: './creation-profil.page.html',
  styleUrls: ['./creation-profil.page.scss'],
})
export class CreationProfilPage implements OnInit {

  connexion: any = false;
  pseudo: any = '';
  mail: any = '';
  password: any = '';
  confPassword: any;
  oldNav: any;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,

  ) { }

  ngOnInit() {

    this.storage.get('actualNav').then((actualNav) => {
      if(actualNav){
        this.oldNav = actualNav;
      }
      this.storage.set('actualNav','creation-profil');
    });

  }

  creationCompte(){

  }

  visibilityPassword(id){
    const eyeChange = (document.getElementById(id) as HTMLIonIconElement);
    let tabId: any[] = [];
    tabId = eyeChange.id.split('_');
    const input = (document.getElementById('input_' + tabId[1]) as HTMLInputElement);

    if(eyeChange.name === 'eye-outline'){
      eyeChange.name = 'eye-off-outline';
      input.type = 'text';
    }
    else{
      eyeChange.name = 'eye-outline';
      input.type = 'password';
    }
  }

  backButton(){
    this.navCtrl.navigateForward(this.oldNav);
  }
}
