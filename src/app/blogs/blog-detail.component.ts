import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { BlogService } from './blogs.service';
import { Blog } from './blog';
import { AuthGuardService } from '../auth/auth-guard.service';

@Component({
  templateUrl: './blog-detail.component.html'
})
export class BlogDetailComponent implements OnInit {

  blog: Blog;
  isLoggedIn: boolean = this.authGuard.loggedIn();
  isCreator: string = this.authGuard.isCreator();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private authGuard: AuthGuardService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getBlog(id);
      }
    );
  }

  getBlog(id: any) {
    return this.blogService.getBlogById(id).subscribe(
      (result) => {
        this.blog = result;
      }
    );
  }

  deleteBlog() {
    if (confirm(`Are you sure you want to delete the blog?`)) {
        this.blogService.deleteBlog(this.blog.data.blogId)
        .subscribe(
          () => {
            this.toastr.success('Blog deleted', 'Success!');
            this.router.navigate(['/blogs']);
          }
      );
    }
  }

}
