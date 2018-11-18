import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: Boolean = false;
  url: string = 'api/login';

  constructor(
    private http: HttpClient
  ) { 
    if ( localStorage.getItem('JWT') ) {
      this.isLoggedIn = localStorage.getItem('JWT')? true : false;
    }
  }

  loginUser(formData): Observable<any> {
    return this.http.put<any>(this.url,formData);
  }

  setIsLoggedIn(value: Boolean) {
    this.isLoggedIn = value;
  }

}
