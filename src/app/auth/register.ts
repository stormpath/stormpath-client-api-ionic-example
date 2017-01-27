import { Account, LoginService, LoginFormModel, RegistrationFormModel, Stormpath } from 'angular-stormpath';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ion-register-form',
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
export class RegisterPage implements OnInit {
  @Input() autoLogin: boolean;
  model: Object;
  error: string;
  viewModel$: Observable<Object>;
  formModel: RegistrationFormModel;
  unverified: boolean;
  canLogin: boolean;
  registered: boolean;

  constructor(private stormpath: Stormpath, private loginService: LoginService) {
    this.unverified = false;
    this.canLogin = false;
    this.formModel = {
      email: '',
      surname: '',
      givenName: '',
      password: ''
    };
  }

  showLogin(): void {
    this.loginService.forgot = this.loginService.register = false;
    this.loginService.login = true;
  }

  ngOnInit(): void {
    this.stormpath.getRegistrationViewModel()
      .subscribe(model => {
          this.model = model;
        }, error =>
          this.error = error.message
      );
  }

  register(): void {
    this.stormpath.register(this.formModel)
      .subscribe((account: Account) => {
        this.registered = true;
        this.unverified = account.status === 'UNVERIFIED';
        this.canLogin = account.status === 'ENABLED';

        if (this.canLogin && this.autoLogin) {
          let loginAttempt: LoginFormModel = {
            login: this.formModel.email,
            password: this.formModel.password
          };

          this.stormpath.login(loginAttempt);
        }
      }, error => this.error = error.message);
  }

  onSubmit(): void {
    this.register();
  }
}
