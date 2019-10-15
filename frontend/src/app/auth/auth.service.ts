import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from './auth';
import { environment } from 'src/environments/environment';

const BACKEND_URI = environment.apiUrl + '/user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private token;

    constructor(private http: HttpClient) {}

    signUp(userInfo: User) {
        return this.http.post<any>(`${BACKEND_URI}/register`, {userInfo})
            .pipe(
                map((response) => {
                    this.login(response.result.email, userInfo.password).subscribe();
                })
            );
    }

    login(email, password) {
        return this.http.post<{token, userId}>(`${BACKEND_URI}/login`, { email, password })
            .pipe(
                map(response => {
                    const authToken = response.token;
                    this.token  = authToken;
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('userId', response.userId);
                })
            );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    getToken() {
        return this.token;
    }
}

