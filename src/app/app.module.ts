import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { fakeBackendProvider } from './mock-data-interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from '@pages/login-page/login-page.component';
import { ContactMePageComponent } from '@pages/contact-me-page/contact-me-page.component';
import { NotFoundPageComponent } from '@pages/not-found-page/not-found-page.component';
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { NavigationBarComponent } from '@components/navigation-bar/navigation-bar.component';
import { AlbumPresentationTableComponent } from '@components/album-presentation-table/album-presentation-table.component';
import { AlbumHandlerModalComponent } from '@components/album-handler-modal/album-handler-modal.component';
import { AlbumListContainerComponent } from '@components/album-list-container/album-list-container.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ContactMePageComponent,
    HomePageComponent,
    NavigationBarComponent,
    AlbumPresentationTableComponent,
    AlbumHandlerModalComponent,
    NotFoundPageComponent,
    AlbumListContainerComponent
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
