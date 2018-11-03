import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import * as firebase from 'firebase';

/**
 * Generated class for the RequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {

  users:any;
  oppodet:any;
  currentuser:string;
  useremail:string;
  challenger:string;
  constructor(public navCtrl: NavController, 
    public afAuth: AngularFireAuth, 
    public afdb: AngularFireDatabase,
    public navparams:NavParams) {
      afdb.list(`users`).snapshotChanges().subscribe((user: any) => {
        this.users = user;
      
      this.useremail = this.afAuth.auth.currentUser.email;
      console.log(this.useremail);

      firebase.database().ref("users").orderByChild("email").equalTo(this.useremail).on("child_added", usern=>{
        this.currentuser = usern.val().username;
        console.log(this.currentuser);
        
        
      })
      
      firebase.database().ref("/Challenges").orderByChild("User2").equalTo(this.currentuser).on("child_added", chal=>{
        this.challenger = chal.val().User2
        console.log(this.challenger);
      })
      
      // firebase.database().ref('users').on('value' , userre=>{
      //   userre.forEach((chose:any) =>{
      //     chose.forEach(element => {
      //       element.val().team;
      //       this.oppodet = element.val().team;
      //       console.log(this.oppodet)
      //     });
      //   })
      // })


    });
  }

}
