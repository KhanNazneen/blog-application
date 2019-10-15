import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Blog } from './blog';
import { BlogService } from './blogs.service';

@Component({
  templateUrl: './blog-edit.component.html'
})
export class BlogEditComponent implements OnInit {

  blogForm: FormGroup;
  private blog: Blog;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      bodyHtml: ['', Validators.required],
    });

    this.route.paramMap.subscribe(
      (params) => {
        const id = params.get('id');
        this.blogService.getBlogById(id).subscribe(
          (blogDetail: Blog) => {
            this.blog = blogDetail;
            this.displayBlog(this.blog.data);
        });
      }
    );
  } // end of ngOnInit

  displayBlog(blog): void {
    this.blogForm.patchValue({
      title: blog.title,
      description: blog.description,
      bodyHtml: blog.bodyHtml
    });
  }

  onUpdate() {
    const updatedBlog = {...this.blog.data, ...this.blogForm.value};
    if (this.blogForm.invalid) {
      this.toastr.error('Can not submit with empty form field', 'Failed!');
      return;
    }
    this.blogService.updateBlog(updatedBlog).subscribe(
      () => {
        this.blogForm.reset();
        this.toastr.success('Blog edited', 'Success!');
        this.router.navigate(['/blogs']);
      }
    );
  }

}
