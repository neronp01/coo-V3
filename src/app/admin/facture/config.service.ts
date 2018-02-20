import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../../services/http-error-handler.service';

export interface Config {
  functionsUrl: string;
  textfile: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class ConfigService {
jason = {
  success: false,
  data: [{
      code: 'SUCCESS',
      message: 'Funky funky API content for you to work with.'
  }]
};
  private handleError: HandleError;
  endpoint = 'https://us-central1-coov3-f509c.cloudfunctions.net/helloWorld';
  configUrl = { functionsUrl: 'https://us-central1-coov3-f509c.cloudfunctions.net/helloWorld' , textfile: 'blablabla' };
  constructor(private http: HttpClient,  httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  getConfig() {
    return this.http.post(this.endpoint, {name: 'pascal', autre: 'autre'});
  }
  sendEmail (email: string): Observable<any> {
    return this.http.post<any>(this.endpoint, this.jason )
      .pipe(
        catchError(this.handleError( 'email', email))
      );
  }
}
