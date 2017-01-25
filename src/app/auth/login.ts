import { Component } from '@angular/core';
import { LoginComponent } from 'angular-stormpath';

@Component({
  selector: 'ion-login-form',
  template: `<ion-card-content class="stormpath-form">
  <form #loginForm="ngForm" (ngSubmit)="login(loginForm.value)" autocomplete="off">
    <ion-row>
      <ion-col>
        <ion-list inset>
          <ion-item>
            <ion-input placeholder="Email" name="login" id="loginField" type="text" required [(ngModel)]="loginFormModel.login"></ion-input>
          </ion-item>
          <ion-item>
            <ion-input placeholder="Password" name="password" id="passwordField" type="password" required [(ngModel)]="loginFormModel.password"></ion-input>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
        <button ion-button class="submit-btn" full type="submit" [disabled]="!loginForm.form.valid">Login</button>
        <button ion-button class="forgot-btn" type="button" block clear (click)="forgot()">Forgot Password?</button>
      </ion-col>
    </ion-row>
  </form>
</ion-card-content>`
})
export class LoginPage extends LoginComponent {

}
