import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth/AuthService';


@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage implements OnInit {

  connecte: any;
  modif: any = false;

  oldNav: any;


  mail: any;
  user: any;
  actualPassword: any;
  newPassword: any;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public authService : AuthService
  ) {
    this.storage.get('actualNav').then((actualNav) => {
      if(actualNav){
        this.oldNav = actualNav;
      }
      // console.log('actualNav', actualNav);
      this.storage.set('actualNav','tabs/profil');
    });

    this.storage.get('checkConnecte').then((connecte) => {
      this.connecte = connecte;
      console.log("connecte: ",connecte);
  });

  
   }

  ngOnInit()
  {
    this.user = this.storage.get('user').then((user) =>{
      console.log("user", user.email);
      this.mail= user.email
    });
  }

  modifierInfos(email, opwd ,npwd)
  {
    const inputMail = (document.getElementById('input_Mail') as HTMLInputElement);
    const inputOldPassword = (document.getElementById('input_OldPassword') as HTMLInputElement);

    this.newPassword = npwd;

    if(this.actualPassword === inputOldPassword.value ||  this.mail !== inputMail.value){
      this.modif = false;
    }else{
      this.authService.editUser(email,opwd,npwd);
    }
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

  goToCreationProfil(connexion)
  {
    this.storage.set('actualNav','tabs/profil');
    this.storage.set('connexion',connexion);

    this.navCtrl.navigateRoot('creation-profil');
  }

  deconnexion(){
    this.authService.SignOut()
    .then(() => {
    this.storage.set('checkConnecte',false);
    this.storage.remove('user');
    });
    this.connecte = false;
    
  }

}
