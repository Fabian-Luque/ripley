import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient, 
        private router: Router,
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/user/login`, { email, password })
            .toPromise()
            .then(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }).catch((err: HttpErrorResponse) => {
                return { error : err };
            });
    }

    register(user: User) {
        return this.http.post<any>(`${environment.apiUrl}/api/user/register`, user)
            .toPromise()
            .then(data => {
                return data;
            }).catch((err: HttpErrorResponse) => {
                return { error: err };
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
        this.currentUserSubject.next(null);
    }
}