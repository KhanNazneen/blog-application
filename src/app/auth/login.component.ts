import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';

@Component({
    templateUrl: './login.component.html'
})

export class AuthComponent {
    loginForm: FormGroup;
    signUpForm: FormGroup;

    showLoginFrom = true;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService) {

        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onLogin() {
        const {email, password} = this.loginForm.value;
        if (this.loginForm.invalid) {
          this.toastr.error('Please check that fields are correctly filled in', 'Error!!!');
          return;
        }

        this.authService.login(email, password)
            .subscribe(
                () => {
                    this.toastr.success('Successfully logged in', 'Success!');
                    this.router.navigate(['/blogs']);
                }
            );
    }
}
