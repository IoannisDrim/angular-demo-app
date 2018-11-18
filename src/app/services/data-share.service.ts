import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from '../models/app-user-model';
import { Album } from '../models/album-model';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private loggedInUserSource = new BehaviorSubject<AppUser>(new AppUser);
  private albumSource = new BehaviorSubject<Album>(new Album);
  loggedInUser = this.loggedInUserSource.asObservable();
  album = this.albumSource.asObservable();

  constructor() { 
    /*If user is already logged in*/
    if ( localStorage.getItem('user') ) {
      this.setLoggedInUser(JSON.parse(localStorage.getItem('user')));
    }

  }

  setLoggedInUser(user: AppUser) {
    this.loggedInUserSource.next(user);
  }

  setAlbum(album: Album ) {
    this.albumSource.next(album);
  }

}