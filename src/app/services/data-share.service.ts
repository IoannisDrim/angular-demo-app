import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from '@models/app-user-model';
import { Album } from '@models/album-model';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private appUser: AppUser;
  private newAlbum: Album;
  private loggedInUserSource = new BehaviorSubject<AppUser>(this.appUser);
  private albumSource = new BehaviorSubject<Album>(this.newAlbum);
  private loggedInUser = this.loggedInUserSource.asObservable();
  private album = this.albumSource.asObservable();

  constructor() {
    /*If user is already logged in*/
    if (localStorage.getItem('user')) {
      this.setLoggedInUser(JSON.parse(localStorage.getItem('user')));
    }

  }

  setLoggedInUser(user: AppUser): void {
    this.loggedInUserSource.next(user);
  }

  setAlbum(album: Album): void {
    this.albumSource.next(album);
  }

}
