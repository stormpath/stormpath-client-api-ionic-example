import { RegisterComponent, LoginService, Stormpath } from 'angular-stormpath';
import { Component } from '@angular/core';
@Component({
  selector: 'ionic-register-form',
  template: `<ion-card-content class="stormpath-form">
  <form *ngIf="!registered" (ngSubmit)="onSubmit()" autocomplete="off" #registerForm="ngForm">
    <ion-row>
      <ion-col>
        <ion-list inset>
          <ion-item *ngFor="let field of model?.form?.fields">
            <ion-input [name]="field.name" [id]="field.name" [type]="field.type"
               [(ngModel)]="formModel[field.name]" [placeholder]="field.placeholder" [disabled]="creating" [required]="field.required"></ion-input>
          </ion-item>
        </ion-list>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <div *ngIf="error" class="alert alert-danger">{{error}}</div>
        <button ion-button type="submit" full [disabled]="!registerForm.form.valid">Register</button>
        <button ion-button type="button" block clear (click)="showLogin()">Cancel</button>
      </ion-col>
    </ion-row>
  </form>
  <p *ngIf="unverified" class="alert alert-success">
    Your account has been created and requires verification.
    Please check your email for a verification link.
  </p>
  <p class="alert alert-success" *ngIf="canLogin">
    Your account has been created, you may now log in.
  </p>
</ion-card-content>`
})
export class IonicRegisterComponent extends RegisterComponent {

  constructor(stormpath: Stormpath, private loginService: LoginService) {
    super(stormpath);
  }

  showLogin(): void {
    this.loginService.forgot = this.loginService.register = false;
    this.loginService.login = true;
  }
}
