import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthPortComponent, Stormpath, LoginService } from 'angular-stormpath';

@Component({
  templateUrl: 'app.html'
})
export class MyApp extends AuthPortComponent {
  rootPage = TabsPage;

  constructor(stormpath: Stormpath, loginService: LoginService, platform: Platform) {
    super(stormpath, loginService);
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
