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
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
            mobileNumber: ['', Validators.required]
        });
    }

    onSignUp() {
        console.log(this.signUpForm.value);
        if (!this.signUpForm.valid) {
            this.toastr.error('Form not valid. Please check that fields are correctly filled in', 'Error!!!');
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
