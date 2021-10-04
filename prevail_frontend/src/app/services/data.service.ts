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
const logsUrl = '/api/logs';
const myLogsUrl = '/api/users/me';
const loginUrl = '/auth/';
const addUser = '/add_user/';
const oLogsUrl = '/api/loglist';
const entriesUrl = '/api/entries/';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private handleError: HandleError;
  private authToken:String;

  private httpOptions:HttpHeaders;

  constructor(
    private http: HttpClient,
    private ls: CookieService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.authToken = ''+ls.get('token');
    this.httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token '+ls.get('token'),
    });
    console.log(this.httpOptions)
    this.handleError = httpErrorHandler.createHandleError('DataService');
  }

  public async updateHttpOptions() {
    this.httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token '+this.ls.get('token'),
      });
  }

  // Test Registration Key
  public validateKey(keyVal: string) {
    return this.http
      .get(baseUrl + regKeyUrl + keyVal + '/', { responseType: 'text' })
      .pipe(catchError(this.handleError('checkKey', [])));
  }

  public login(username: string, password: string) {
    return this.http
      .post(baseUrl + loginUrl, { username: username, password: password })
      .pipe(
        catchError(err => {
          this.handleError('checkKey', []);
          return throwError(err);
      }))
  }

  public createUser(userName: string, pw: string) {}

  public getUser(username: string, pw: string) {}

  public getLog(oid?: string): Observable<Log[]> {
    let urlString = baseUrl + myLogsUrl;
    if (oid) {
      urlString += '/' + oid;
    }
    return this.http
      .get<Log[]>(urlString, {headers:this.httpOptions})
      .pipe(catchError(this.handleError('getLog', [])));
  }

  public addLog(log: Log): Observable<Log> {
    return this.http
      .post<Log>(baseUrl + logsUrl, log, {headers:this.httpOptions})
      .pipe(catchError(this.handleError('postLog', log)));
  }

  public getOrderedLogList(oid?: string): Observable<Log[]> {
    return this.http
      .get<Log[]>(baseUrl + oLogsUrl + oid)
      .pipe(catchError(this.handleError('getOrderedLogList', [])));
  }

  public getEntries(oid?: string): Observable<Entries[]> {
    return this.http
      .get<Entries[]>(baseUrl + entriesUrl + oid)
      .pipe(catchError(this.handleError('getEntries', [])));
  }

  public addEntry(entry: Entries): Observable<Entries> {
    return this.http
      .post<Entries>(baseUrl + entriesUrl, entry, {headers:this.httpOptions})
      .pipe(catchError(this.handleError('addEntry', entry)));
  }
}
