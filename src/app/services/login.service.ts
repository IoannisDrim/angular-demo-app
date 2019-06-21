import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: Boolean = false;
  url = 'api/login';

  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem('JWT')) {
      this.isLoggedIn = localStorage.getItem('JWT') ? true : false;
    }
  }

  loginUser(formData): Observable<any> {
    return this.http.put<any>(this.url, formData);
  }

  setIsLoggedIn(value: Boolean) {
    this.isLoggedIn = value;
  }

}
