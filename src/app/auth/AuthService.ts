import { Injectable, NgZone } from '@angular/core';
import { User } from "../user/user";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import auth from '@firebase/app-compat';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; 
  constructor(
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, 
    public ngZone: NgZone, 
    private storage : Storage 
  ) {    

    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.userData = user;
        this.storage.set('user',JSON.stringify(this.userData));
        JSON.parse(await this.storage.get('user'));
      } else {
        this.storage.set('user',null);
        JSON.parse(await this.storage.get('user'));
      }
    })
  }

  async SignIn(email: string, password: string) {
    try {
          const result = await this.afAuth.signInWithEmailAndPassword(email, password);
          this.SetUserData(result.user);
      } catch (error) {
          window.alert(error.message);
      }
  }

  async SignUp(email: string, password: string) {
    try {
          const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
          this.SetUserData(result.user);

      } catch (error) {
          window.alert(error.message);
      }
  }

  async isLoggedIn(): Promise<boolean> {
    const user = JSON.parse(await this.storage.get('user'));
    return (user !== null) ? true : false;
  }
  

  SetUserData(user: firebase.User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    this.storage.set('user',userData);
    return userRef.set(userData, {
      merge: true
    })
  }

  async SignOut() {
    await this.afAuth.signOut().then(()=>{
      this.storage.remove('user');
    })
      
  }

  async editUser(email:string,oldpassword:string,password:string){
    try{
      let user = await this.afAuth.currentUser;
      window.alert("user : "+password);
      let _credential = auth.auth.EmailAuthProvider.credential(user.email,oldpassword);
      user.reauthenticateWithCredential(_credential);
      user.updatePassword(password);
    }
    catch (error){
      window.alert(error);
    }
  }
}