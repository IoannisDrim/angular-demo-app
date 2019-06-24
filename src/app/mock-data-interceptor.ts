import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users: any[] = [
      // tslint:disable-next-line: max-line-length
      { id: 1, username: 'admin', password: '0000', jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' },
      // tslint:disable-next-line: max-line-length
      { id: 2, username: 'test', password: '1234', jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }
    ];

    return of(null).pipe(mergeMap(() => {
      // authenticate
      if (request.url.endsWith('api/login') && request.method === 'PUT') {
        const filteredUsers: any[] = users.filter((user: any) => {
          return user.username === request.body.username && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          // if login details are valid return 200 OK with user details and fake jwt token
          const user: any = filteredUsers[0];
          const body: any = {
            id: user.id,
            username: user.username,
            jwt: user.jwt
          };

          return of(new HttpResponse({ status: 200, body: body }));
        } else {
          // else return 400 bad request
          return throwError({ message: 'Username or password is incorrect' });
        }
      }

      // pass through any requests not handled above
      return next.handle(request);

    }))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export const fakeBackendProvider: any = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
