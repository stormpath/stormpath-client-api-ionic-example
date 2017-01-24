import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { StormpathConfiguration, StormpathModule } from 'angular-stormpath';
import { BeerListPage } from '../pages/beer-list/beer-list';
import { IonicLoginComponent } from './auth/ionic.login.component'
import { IonicRegisterComponent } from './auth/ionic.register.component';
import { IonicForgotPasswordComponent } from './auth/ionic.forgot.password.component';

export function stormpathConfig(): StormpathConfiguration {
  let spConfig: StormpathConfiguration = new StormpathConfiguration();
  spConfig.endpointPrefix = 'https://raible.apps.stormpath.io';
  return spConfig;
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BeerListPage,
    IonicLoginComponent,
    IonicRegisterComponent,
    IonicForgotPasswordComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StormpathModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BeerListPage,
    IonicLoginComponent,
    IonicRegisterComponent,
    IonicForgotPasswordComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: StormpathConfiguration, useFactory: stormpathConfig}
  ]
})
export class AppModule {}
