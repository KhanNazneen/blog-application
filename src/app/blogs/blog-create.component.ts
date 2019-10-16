import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BlogService } from './blogs.service';

@Component({
  templateUrl: './blog-create.component.html'
})
export class BlogCreateComponent {

  createBlogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.createBlogForm = this.fb.group ({
      title: ['', Validators.required],
      description: ['', Validators.required],
      bodyHtml: ['', Validators.required],
      fullName: ['', Validators.required],
    });
  }

  get title() {  return this.createBlogForm.get('title'); }
  get description() {  return this.createBlogForm.get('description'); }
  get bodyHtml() {  return this.createBlogForm.get('bodyHtml'); }
  get fullName() {  return this.createBlogForm.get('fullName'); }

  onPost() {
    const blog = {
      title: this.createBlogForm.value.title,
      description: this.createBlogForm.value.description,
      bodyHtml: this.createBlogForm.value.bodyHtml,
      fullName: this.createBlogForm.value.fullName
    };

    if (this.createBlogForm.invalid) {
      this.toastr.error('Can not submit with empty form field(s)', 'Failed!');
      return;
    }

    this.blogService.createBlog(blog).subscribe(
      () => {
        this.toastr.success('Blog Created', 'Success!');
        this.router.navigate(['/blogs']);
      }
    );
  }

}
