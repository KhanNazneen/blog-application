import { Component, OnInit } from '@angular/core';

import { Blog } from './blog';
import { BlogService } from './blogs.service';

@Component({
  templateUrl: './blog-list.component.html'
})

export class BlogListComponent implements OnInit {

  blogs: Blog;
  showDiv: boolean;
  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getAllBlogs().subscribe(
      (data) => {
        this.showDiv = true;
        this.blogs = data;
    });
  }
}
