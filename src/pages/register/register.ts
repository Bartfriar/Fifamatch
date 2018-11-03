import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { LoginPage } from '../login/login';
import { TeamDetailsPage } from '../team-details/team-details';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage {

  a: string;
  b: string;
  username: string;
  Tel: string;

  constructor(
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public navCtrl: NavController,
    public toastCtrl: ToastController
    ) { 
  }

  ionViewDidLoad() {
    // 
  }

  async register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.a, this.b)
      .then((user) => {
        var userDetails = user.user;
        this.afDb.object(`users/${userDetails.uid}`).set({
          Email: userDetails.email,
          Username: this.username,
          Telephone: this.Tel
        });
        var toast = this.toastCtrl.create({
          message: 'You have successfully registered',
          duration: 3000
        })
        toast.present();
        this.navCtrl.setRoot(TeamDetailsPage);
      }).catch((err) => {
        const toast = this.toastCtrl.create({
          message: err.message,
          duration: 3000
        });
        toast.present();
      })
  }

  gotoLoginPage() {
    this.navCtrl.setRoot(LoginPage);
  }
  
}
