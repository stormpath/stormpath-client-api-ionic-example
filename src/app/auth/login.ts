import { Component } from '@angular/core';
import { Account, LoginFormModel, Stormpath, LoginService, StormpathErrorResponse } from 'angular-stormpath';
import { Observable } from 'rxjs';

@Component({
  selector: 'ion-login-form',
  template: `<ion-card-content class="stormpath-form">
  <div class="text-center">
    <img src="assets/imgs/logo.png" class="logo">
  </div>
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
        <button ion-button class="create-btn" type="button" block clear (click)="showRegister()">Create Account</button>
      </ion-col>
    </ion-row>
  </form>
</ion-card-content>`
})
export class LoginPage {
  loginFormModel: LoginFormModel;
  user$: Observable<Account | boolean>;
  loggedIn$: Observable<boolean>;
  error: string;

  showRegister(): void {
    this.loginService.forgot = this.loginService.login = false;
    this.loginService.register = true;
  }

  constructor(public stormpath: Stormpath, public loginService: LoginService) {
  }

  ngOnInit(): void {
    this.user$ = this.stormpath.user$;
    this.loggedIn$ = this.user$.map(user => !!user);
    this.loginFormModel = {
      login: '',
      password: ''
    };
  }

  login(form: any): void {
    this.error = null;
    this.stormpath.login(this.loginFormModel)
      .subscribe(null, (error: StormpathErrorResponse) => {
        this.error = error.message;
      });
  }

  forgot(): void {
    this.loginService.forgotPassword();
  }
}
