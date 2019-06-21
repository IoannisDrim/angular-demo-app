import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from '@pages/login-page/login-page.component';
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { ContactMePageComponent } from '@pages/contact-me-page/contact-me-page.component';
import { NotFoundPageComponent } from '@pages/not-found-page/not-found-page.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', canActivate: [AuthGuard], component: HomePageComponent },
  { path: 'contact-me', canActivate: [AuthGuard], component: ContactMePageComponent },
  { path: 'not-found', canActivate: [AuthGuard], component: NotFoundPageComponent },
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
