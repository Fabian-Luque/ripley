import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from "src/environments/environment"
import { Transfer } from '../models/transfer';
@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  getTranfersUser(userId) {
    return this.http.get<Transfer[]>(`${environment.apiUrl}/api/transfer/user/${userId}`)
      .toPromise()
      .then(data => {
			  return data;
      }).catch((err: HttpErrorResponse) => {
        return { error : err };
      });
  }

  deposit( transfer : Transfer ) {
    return this.http.post<any>(`${environment.apiUrl}/api/transfer`, transfer)
      .toPromise()
      .then(data => {
			  return data;
      }).catch((err: HttpErrorResponse) => {
        return { error : err };
      });
  }
}
