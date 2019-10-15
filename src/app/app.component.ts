import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  navbarOpen = false;

  loggedIn(): boolean {
    return localStorage.getItem('token') !==  null;
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

}
