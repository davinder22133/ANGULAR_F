import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailCheckerComponent } from './email-checker/email-checker.component';
import { FormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DashBoardViewComponent } from './dash-board-view/dash-board-view.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { authGuardGuard } from './auth-guard.guard';
const routes: Routes = [

  {path:'home',component:EmailCheckerComponent,canActivate:[authGuardGuard]},
  {path:'login',component:LoginComponent,canActivate:[authGuardGuard]},
  
  {path:'register',component:RegisterUserComponent,canActivate:[authGuardGuard]},
  // {path:'vfvdg',component:DashBoardViewComponent,canActivate:[authGuardGuard]},
  {path:'dashboard',component:AddDetailsComponent,canActivate:[authGuardGuard]},

  // {path:'**',component:}
  {path:'showDetials',component:DashBoardViewComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailCheckerComponent,
    RegisterUserComponent,
    DashBoardViewComponent,
    AddDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
