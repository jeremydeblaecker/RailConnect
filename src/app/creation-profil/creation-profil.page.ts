import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth/AuthService';

@Component({
  selector: 'app-creation-profil',
  templateUrl: './creation-profil.page.html',
  styleUrls: ['./creation-profil.page.scss'],
})
export class CreationProfilPage implements OnInit {

  connexion: any;
  titre: any;
  oldNav: any;

  mail: any = '';
  password: any = '';
  confPassword: any;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public authService: AuthService

  ) {
    this.storage.get('actualNav').then((actualNav) => {
      if(actualNav){
        this.oldNav = actualNav;
      }
    });
    this.storage.get('connexion').then((connexion) => {
      this.connexion = connexion;
      if(connexion)
        this.titre = "Se connecter";
      else
        this.titre = "Créer un compte";
    });
  }

  ngOnInit() {

    // console.log('this.oldNav: ', this.oldNav);

  }

  creationCompte(email : string, pwd : string){
    this.authService.SignIn(email,pwd)
    .then(()=>{this.storage.set('checkConnecte', true);
    this.backButton();});
  }

  connexionCompte(email : string, pwd : string){
    this.authService.SignIn(email,pwd)
    .then(()=>{this.storage.set('checkConnecte', true);
    this.backButton();});
  }

  visibilityPassword(id : string){
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
    // console.log('this.oldNav: ', this.oldNav);
    this.navCtrl.navigateRoot(this.oldNav);
  }
}
