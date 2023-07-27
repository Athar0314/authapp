import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Module } from './module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddcustComponent } from './addcust/addcust.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { RegistrationComponent } from './registration/registration.component';
import { UpdateComponent } from './update/update.component';
import { UserlistComponent } from './userlist/userlist.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { UpdatecustComponent } from './updateuser/updateuser.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';

@NgModule({
  declarations: [
    AppComponent,
    AddcustComponent,
    CustomerComponent,
    HomeComponent,
    LoginComponent,
    Page404Component,
    RegistrationComponent,
    UpdateComponent,
    UserlistComponent,
    ProfileComponent,
    UpdatecustComponent,
    AboutpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Module,
    HttpClientModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
