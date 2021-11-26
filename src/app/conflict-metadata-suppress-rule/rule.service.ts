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

  getAll() {
    /*return this.httpClient
      .get(this.apiURL + '/rule')

      .pipe(catchError(this.errorHandler));*/
    return [{
      prog_rule_sgk: 1,
      alert_id: 1,
      field_name: "Nishant",
      conflict_code: 430,
      supress_message: 'Y',
      eff_start_dt: '10-11-2021',
      eff_end_dt: '10-12-2021',
      active_ind: 'Y'
    },
    {
      prog_rule_sgk: 1,
      alert_id: 1,
      field_name: "Nishant",
      conflict_code: 430,
      supress_message: 'Y',
      eff_start_dt: '10-11-2021',
      eff_end_dt: '10-12-2021',
      active_ind: 'Y'
    },
    {
      prog_rule_sgk: 1,
      alert_id: 1,
      field_name: "Nishant",
      conflict_code: 430,
      supress_message: 'Y',
      eff_start_dt: '10-11-2021',
      eff_end_dt: '10-12-2021',
      active_ind: 'Y'
    }];
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
