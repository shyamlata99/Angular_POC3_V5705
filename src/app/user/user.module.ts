import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRegisterComponent } from './user-register/user-register.component';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserDashboardComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    ReactiveFormsModule
  ]
})
export class UserModule { }
