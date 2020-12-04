import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from "src/environments/environment"
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/api/user`)
            .toPromise()
            .then(data => {
                    return data;
            }).catch((err: HttpErrorResponse) => {
                return { error : err };
            });
    }

    getAccount(userId) {
        return this.http.get<Account>(`${environment.apiUrl}/api/account/user/${userId}`)
            .toPromise()
            .then(data => {
                    return data;
            }).catch((err: HttpErrorResponse) => {
                return { error : err };
            });
    }

    getUserByRut(rut) {
        return this.http.get<User>(`${environment.apiUrl}/api/user/rut/${rut}`)
            .toPromise()
            .then(data => {
                return data;
            }).catch((err: HttpErrorResponse) => {
                return { error : err };
            });
    }
}