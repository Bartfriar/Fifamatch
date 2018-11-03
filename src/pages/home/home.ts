import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { ScoresPage } from '../scores/scores';
import { GamePage } from '../game/game';
import * as firebase from 'firebase';
import { RequestsPage } from '../requests/requests';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
users:any;
useremail:string;
currentuser:string;
teamdet:string;
teampic:any;
teamform:any;
firstName:string;
teamlogo:string;
  constructor(public navCtrl: NavController, 
    public afAuth: AngularFireAuth, 
    public afdb: AngularFireDatabase,
    public navparams:NavParams) {

      this.useremail = this.afAuth.auth.currentUser.email;
      console.log(this.useremail)

      afdb.list(`users`).snapshotChanges().subscribe((user: any) => {
      this.users = user;
      
      console.log(this.users);

       firebase.database().ref('users').on('value' , userre=>{
        userre.forEach((chose:any) =>{
          chose.forEach((single:any) => {
            single.forEach(element=>{
              var teamarray=[];
            element.val();
            this.teamdet = element.val();
            console.log(this.teamdet)
          });
          });
        })
      })
     
    //  var getuser = firebase.database().ref('users');
    //  var getteam = getuser.child('Team');
    //  var getname = getteam.child('team');
    //  var nameteam = getname.toString();
    //  console.log(nameteam);
  });
  firebase.database().ref("users").orderByChild("email").equalTo(this.useremail).on("child_added", usern=>{
    this.currentuser = usern.val().username;
    console.log(this.currentuser);
  })

  }
  challenge(opponent){
    this.navCtrl.push(GamePage, {opponent_name:opponent.payload.val().username});
    firebase.database().ref(`users/${opponent.key}/Challenges`).push({
      Opponent:this.currentuser,//challenger
      User1:opponent.payload.val().username,//opponent
      Challengestate:"No",


    });
   
  }
  torequests(){
    this.navCtrl.push(RequestsPage);
  }


  logout() {
    this.afAuth.auth.signOut();
  }
}
