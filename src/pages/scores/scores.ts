import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-scores',
  templateUrl: 'scores.html',
})
export class ScoresPage {

  GameID = 1;
  counter = 0;
  counter2 = 0;
  team_name:string;
  username:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.team_name = navParams.get("name_team");
    this.username = navParams.get("opponent_name")
    console.log(this.username)
  }

  increment(){
    this.counter ++;
  }
  
  decrement(){
    this.counter --;
  }

  increment1(){
    this.counter2 ++;
  }

  decrement1(){
    this.counter2 --;
  }

  clear(){
    this.counter
  }

  save_score(){
    firebase.database().ref('Games/' + this.GameID).set({
      TeamA:this.team_name,
      TeamB:"Liverpool",
      TeamA_Score:this.counter,
      TeamB_Score:this.counter2,
    });
  }
  
  reset(){

  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad ScoresPage');
  }

}
