import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Stormpath } from 'angular-stormpath';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private stormpath: Stormpath) {
  }

  logout(): void {
    this.stormpath.logout();
  }
}
