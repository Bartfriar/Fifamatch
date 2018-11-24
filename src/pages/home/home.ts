import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, snapshotChanges } from "@angular/fire/database";
import { ScoresPage } from "../scores/scores";
import { GamePage } from "../game/game";
import * as firebase from "firebase";
import { RequestsPage } from "../requests/requests";
import { AboutPage } from "../about/about";
import { filter } from "rxjs/operators";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  users: any;
  state: any;
  useremail: string;
  currentuser: string;
  teamdet: string;
  teampic: any;
  teamform: any;
  firstName: string;
  teamlogo: string;
  logger: any;
  rank: any;
  win: any;
  loss: any;
  currentid: any;
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afdb: AngularFireDatabase,
    public navparams: NavParams
  ) {
    this.useremail = this.afAuth.auth.currentUser.email;
    this.currentid = this.afAuth.auth.currentUser.uid;

    afdb
      .list(`users`, ref => ref.orderByChild("UserID"))
      .valueChanges()
      .subscribe((user: any) => {
        this.users = user;
        this.users = this.users.filter(usr => usr.UserID != this.currentid);
        this.users = this.users.filter(tost => tost.)
        console.log(this.users);

        //  firebase.database().ref('users').on('value' , userre=>{
        //   userre.forEach((chose:any) =>{
        //     chose.forEach((single:any) => {
        //       single.forEach(element=>{
        //         var teamarray=[];
        //       element.val();
        //       this.teamdet = element.val();
        //       console.log(this.teamdet)
        //     });
        //     });
        //   })
        // })

        //  var getuser = firebase.database().ref('users');
        //  var getteam = getuser.child('Team');
        //  var getname = getteam.child('team');
        //  var nameteam = getname.toString();
        //  console.log(nameteam);
      });

    this.logger = firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(this.useremail);
    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(this.useremail)
      .on("child_added", usern => {
        this.currentuser = usern.val().username;
      });
    firebase
      .database()
      .ref("LeaderBoards")
      .on("child_added", lead => {
        this.rank = lead.val().Rank;
        console.log(this.rank);
      });
  }
  challenge(opponent) {
    var challengekey = firebase
      .database()
      .ref()
      .child("Challenges")
      .push().key;

    firebase
      .database()
      .ref(`Challenges/${challengekey}`)
      .set({
        Challengeuid: challengekey,
        Challenger: this.currentuser, //challenger
        Opponent: opponent.username, //opponent
        Challengestate: "No"
      });

    firebase
      .database()
      .ref("Challenges")
      .orderByChild("Challengestate")
      .equalTo("Yes")
      .on("child_changed", chal => {
        this.state = chal.val().Challengestate;
        console.log(this.state);
        if (this.state == "Yes") {
          this.navCtrl.push(GamePage, {
            opponent_name: opponent.username,
            Challenge_key: challengekey
          });
        } else {
          this.navCtrl.push(RequestsPage, { opponent_name: opponent.username });
        }
      });
  }
  torequests() {
    this.navCtrl.push(RequestsPage);
  }
  profile() {
    this.navCtrl.push(AboutPage);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
