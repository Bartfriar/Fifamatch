import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// firebase
import { firebaseconfig } from './firebasconfig';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TeamDetailsPage } from '../pages/team-details/team-details';
import { ScoresPage } from '../pages/scores/scores';
import { FormationsPage} from '../pages/formations/formations'
import { GamePage } from '../pages/game/game';
import { RequestsPage } from '../pages/requests/requests';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, 
    LoginPage,
    RegisterPage,
    TeamDetailsPage,
    ScoresPage,
    FormationsPage,
    GamePage,
    RequestsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollpadding: false,
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, 
    LoginPage,
    RegisterPage,
    TeamDetailsPage,
    ScoresPage,
    FormationsPage,
    GamePage,
    RequestsPage
  ],
  providers: [
    StatusBar,
    SplashScreen, AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
