import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RuleModel } from './rule.model';

@Injectable({
  providedIn: 'root',
})
export class RuleService {
  private apiURL =
    'http://localhost:13144/microservices/conflictmetadatamgntapp';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + '/rule')
      .pipe(catchError(this.errorHandler));
  }

  create(rule: RuleModel): Observable<any> {
    return this.httpClient
      .post(this.apiURL + '/rule', JSON.stringify(rule), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  find(id: number): Observable<any> {
    console.log(id);
    return this.httpClient
      .get(this.apiURL + '/rule/' + id)

      .pipe(catchError(this.errorHandler));
  }

  update(id: number, rule: RuleModel): Observable<any> {
    return this.httpClient
      .put(this.apiURL + '/rule/' + id, JSON.stringify(rule), this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/rule/' + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
