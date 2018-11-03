import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeamInfo } from '../../models/team-details/team-details.interface';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  teaminfo = {} as TeamInfo
  constructor(public navCtrl: NavController) {

  }

}
