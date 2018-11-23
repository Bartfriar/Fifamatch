import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { TeamInfo } from '../../models/team-details/team-details.interface';
import * as firebase from 'firebase';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  teaminfo = {} as TeamInfo
  useremail:string;
  username:string;
  phone:any;
  constructor(public navCtrl: NavController, 
    public afAuth: AngularFireAuth, 
    public afdb: AngularFireDatabase,
    public navparams:NavParams){
      this.useremail = this.afAuth.auth.currentUser.email;
      console.log(this.useremail);
      firebase.database().ref("users").orderByChild("email").equalTo(this.useremail).on("child_added", usern=>{
        this.username = usern.val().username;
        this.phone = usern.val().Telephone;
      })
  }

}
