import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from '../services//cookie.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { User } from '../user';
import { Log } from '../log';
import { Entries } from '../entries';

const baseUrl = 'http://44.193.83.129:8000';
const userUrl = '/api/users/';
const regKeyUrl = '/register/';
const logsUrl = '/api/logs/';
const myLogsUrl = '/api/users/me';
const loginUrl = '/auth/';
const addUser = '/add_user/';
const oLogsUrl = '/api/loglist';
const entriesUrl = '/api/entries/';

@Injectable({
  providedIn: 'root',
})
export class Data2Service {
  private handleError: HandleError;

  private httpOptions:HttpHeaders;

  constructor(
    private http: HttpClient,
    private ls: CookieService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token '+ls.get('token'),
    });
    console.log(this.httpOptions)
    this.handleError = httpErrorHandler.createHandleError('Data2Service');
  }

  public async updateHttpOptions() {
    this.httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token '+this.ls.get('token'),
      });
  }

  public register(username: string, password: string) {
    return this.http
      .post(baseUrl + userUrl, { username: username, password: password })
  }

  public join_mission(uuid:string) {
    return this.http
      .get(baseUrl + logsUrl + uuid + '/add_user', {headers:this.httpOptions})
  }

  public create_mission(description: string, tags: string) {
    return this.http
      .post(baseUrl + logsUrl, { users: [this.ls.get('username')], tags: tags, description: description}, {headers:this.httpOptions})
  }
  
}
