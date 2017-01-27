import { ForgotPasswordFormModel, StormpathErrorResponse, Stormpath, LoginService } from 'angular-stormpath';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ion-forgot-password-form',
  template: `<ion-card-content class="stormpath-form">
  <p *ngIf="sent" class="alert alert-success">
    We have sent a password reset link to the email address of the account that you specified.
    Please check your email for this message, then click on the link.<br>
    <button ion-button type="button" (click)="showLogin()">Back to Login</button>
  </p>
  <ion-row>
  <ion-col>
    <form *ngIf="!sent" #registerForm="ngForm" (ngSubmit)="onSubmit(registerForm.value)" autocomplete="off">
      <ion-list inset>
        <ion-item>
          <ion-input name="email" type="email" id="spEmail" [(ngModel)]="forgotPasswordFormModel.email"
                 placeholder="Your Email Address" [disabled]="posting" required></ion-input>
        </ion-item>
      </ion-list>
      <ion-row>
        <ion-col>
          <p class="text-danger" *ngIf="error">{{error}}</p>
          <button ion-button type="submit" full [disabled]="!registerForm.form.valid || posting">Request Password Reset</button>
          <button ion-button type="button" block clear (click)="showLogin()">Cancel</button>
        </ion-col>
      </ion-row>
    </form>
    </ion-col>
  </ion-row>
</ion-card-content>`
})
export class ForgotPasswordPage implements OnInit {
  private forgotPasswordFormModel: ForgotPasswordFormModel;
  error: string;
  sent: boolean;

  constructor(private stormpath: Stormpath, private loginService: LoginService) {
    this.sent = false;
  }

  showLogin(): void {
    this.loginService.forgot = this.loginService.register = false;
    this.loginService.login = true;
  }

  ngOnInit(): void {
    this.forgotPasswordFormModel = {
      email: ''
    };
  }

  send(): void {
    this.error = null;
    this.stormpath.sendPasswordResetEmail(this.forgotPasswordFormModel)
      .subscribe(() => this.sent = true,
        (error: StormpathErrorResponse) => this.error = error.message);
  }

  onSubmit(form: any): void {
    this.send();
  }
}
