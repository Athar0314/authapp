import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { guardGuard } from './auth/guard.guard';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserlistComponent } from './userlist/userlist.component';
import { CustomerComponent } from './customer/customer.component';
import { Page404Component } from './page404/page404.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'signup',
    component: RegistrationComponent,
  },
  {
    path: 'about',
    component: AboutpageComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserlistComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'cust',
    component: CustomerComponent,
    canActivate: [guardGuard],
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
