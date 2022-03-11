import { Injectable, NgZone } from '@angular/core';
import { User } from "../user/user";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service  
    public ngZone: NgZone,
    private storage : Storage // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(async user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(await this.storage.get('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(await this.storage.get('user'));
      }
    })
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
          const result = await this.afAuth.signInWithEmailAndPassword(email, password);
          this.SetUserData(result.user);
      } catch (error) {
          window.alert(error.message);
      }
  }
  // Sign up with email/password
  async SignUp(email: string, password: string) {
    try {
          const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
          /* Call the SendVerificaitonMail() function when new user sign
          up and returns promise */
          //this.SendVerificationMail();
          this.SetUserData(result.user);

      } catch (error) {
          window.alert(error.message);
      }
  }
  // Send email verfificaiton when new user sign up
  /*SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }*/
  // Reset Forggot password


  async ForgotPassword(passwordResetEmail: string) {
    try {
          await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
          window.alert('Password reset email sent, check your inbox.');
      } catch (error) {
          window.alert(error);
      }
  }
  // Returns true when user is looged in and email is verified
  async isLoggedIn(): Promise<boolean> {
    const user = JSON.parse(await this.storage.get('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  // Sign in with Google
  /*GoogleAuth() {
    return this.AuthLogin(new Auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
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
  // Sign out 
  async SignOut() {
    await this.afAuth.signOut();
      this.storage.remove('user');
  }

  async editUser(email:string,oldpassword:string,password:string){
    try{
      let user = await this.afAuth.currentUser;
      window.alert("user : "+password);
      //let _credential = firebase.auth.EmailAuthProvider.credential(user.email,oldpassword)
      user.updatePassword(password);
    }
    catch (error){
      window.alert(error);
    }
  }
}