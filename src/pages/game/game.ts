import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// FIrebase
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormationsPage } from '../formations/formations';
import { ScoresPage } from '../scores/scores';
import * as firebase from 'firebase';
/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {


  authState: any = null;
  teams:any;
  username:string;
  GameID:string;
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase,
    public navparams: NavParams ) {
      afDb.list(`Teams`).snapshotChanges()
        .subscribe((team: any) => {
          this.teams = team;
          console.log(this.teams);
      });

      this.username = navparams.get("opponent_name")
      console.log(this.username)

      // this.afAuth.authState.subscribe((auth) => {
      //   this.authState = auth
      // });
  }
  // get currentUserDisplayName(): string {
  //   if (!this.authState) { return 'Guest' }
  //   else { return this.authState['displayName'] || 'User without a Name' }
  // }
  game(chosen_team){
    this.GameID = this.username + "1";
    var logo = chosen_team.payload.val().Logo;
    var team_name = chosen_team.payload.val().Team_Name;
    
    this.navCtrl.push(ScoresPage, {name_team:team_name, logo_team:logo, opponent_name:chosen_team.payload.val().username}) 
   
    firebase.database().ref('Games/' + this.GameID).set({
      TeamA:team_name,
      TeamB:"Liverpool"
    });
  }
}
