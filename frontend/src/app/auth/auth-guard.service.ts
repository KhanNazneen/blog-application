import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable(
    {providedIn: 'root'}
)
export class AuthGuardService {

    constructor(private router: Router) {}

    isCreator() {
        const creator = localStorage.getItem('userId');
        return creator;
    }

    loggedIn(): boolean {
        return localStorage.getItem('token') !==  null;
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        const helper = new JwtHelperService();
        return !helper.isTokenExpired(token);
    }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}

