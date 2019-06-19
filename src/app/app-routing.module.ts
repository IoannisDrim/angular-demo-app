import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactMePageComponent } from './components/contact-me-page/contact-me-page.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/loginPage', pathMatch: 'full' },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'homePage', canActivate: [AuthGuard], component: HomePageComponent },
  { path: 'contactMe', canActivate: [AuthGuard], component: ContactMePageComponent },
  { path: '**', redirectTo: '/loginPage' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
