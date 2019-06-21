import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album } from '@models/album-model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  url: string;
  endpoints: any;
  headers: any = {
    headers: {
      'jwt': localStorage.getItem('JWT')
    }
  };

  constructor(
    private http: HttpClient
  ) {
    this.url = 'https://jsonplaceholder.typicode.com';
    this.endpoints = {
      albums: '/albums'
    };
  }

  getAlbums(userId): Observable<any> {
    return this.http.get(this.url + this.endpoints.albums + '?userId=' + userId, this.headers);
  }

  deleteAlbum(albumId): Observable<any> {
    return this.http.delete(this.url + this.endpoints.albums + '/' + albumId, this.headers);
  }

  updateAlbum(album): Observable<any> {
    return this.http.put<Album>(this.url + this.endpoints.albums + '/' + album.id, album, this.headers);
  }

  createAlbum(album): Observable<any> {
    return this.http.post<Album>(this.url + this.endpoints.albums, album, this.headers);
  }

}
