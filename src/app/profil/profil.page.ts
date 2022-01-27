import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html',
  styleUrls: ['profil.page.scss']
})
export class ProfilPage {

  modif: any = false;
  pseudo: any = 'mon pseudo';
  mail: any = 'monMail@mail.com';
  actualPassword: any = '';
  newPassword: any;

  constructor() {}

  modifierInfos()
  {
    const inputPseudo = (document.getElementById('inputPseudo') as HTMLInputElement);
    const inputMail = (document.getElementById('inputMail') as HTMLInputElement);
    const inputOldPassword = (document.getElementById('inputOldPassword') as HTMLInputElement);
    const inputNewPassword = (document.getElementById('inputNewPassword') as HTMLInputElement);

    console.log('inputPseudo.value: ', inputPseudo.value);
    console.log('inputMail.value: ', inputMail.value);
    console.log('inputOldPassword.value: ', inputOldPassword.value);
    console.log('inputNewPassword.value: ', inputNewPassword.value);

    this.pseudo = inputPseudo.value;
    this.newPassword = inputNewPassword.value;

    if(this.actualPassword === inputOldPassword.value || this.pseudo !== inputPseudo.value || this.mail !== inputMail.value){
      this.modif = false;
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

}
