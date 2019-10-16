import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';

@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
    signUpForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.signUpForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            mobileNumber: ['', [Validators.required, Validators.pattern(/^(0|91)?[6-9]\d{9}$/)]]
        });
    }

    get firstName() {  return this.signUpForm.get('firstName'); }
    get lastName() {  return this.signUpForm.get('lastName'); }
    get email() {  return this.signUpForm.get('email'); }
    get password() {  return this.signUpForm.get('password'); }
    get mobileNumber() {  return this.signUpForm.get('mobileNumber'); }

    onSignUp() {
        if (this.signUpForm.invalid) {
            return;
        }

        this.authService.signUp(this.signUpForm.value)
            .subscribe(
                () => {
                    this.toastr.success('Successfully signed in', 'Success!');
                    this.router.navigate(['/blogs']);
                }
            );
    }
}
