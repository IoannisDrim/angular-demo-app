import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './mock-data-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ContactMePageComponent } from './components/contact-me-page/contact-me-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { DataPresentationTableComponent } from './components/data-presentation-table/data-presentation-table.component';
import { AlbumHandlerModalComponent } from './components/album-handler-modal/album-handler-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ContactMePageComponent,
    HomePageComponent,
    NavigationBarComponent,
    DataPresentationTableComponent,
    AlbumHandlerModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent],
  entryComponents: [AlbumHandlerModalComponent]
})
export class AppModule { }
