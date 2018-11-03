import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AngularFireAuth } from '@angular/fire/auth';
import { TeamDetailsPage } from '../pages/team-details/team-details';
import { HomePage } from '../pages/home/home';
import { ScoresPage } from '../pages/scores/scores';
import { AboutPage } from '../pages/about/about';
import { FormationsPage } from '../pages/formations/formations';
import { GamePage } from '../pages/game/game';
import { RequestsPage } from '../pages/requests/requests';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  constructor(
    public checkAut: AngularFireAuth,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
      checkAut.authState.subscribe(user => {
        if(user){
          console.log('you are logged in');
          this.rootPage = HomePage
        } else {
          console.log('Not logged in');
          this.rootPage = LoginPage
          
        }
      })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}
