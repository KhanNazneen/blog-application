import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Blog } from './blog';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

const BACKEND_URI = environment.apiUrl + '/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<Blog> {
    return this.http.get<Blog>(`${BACKEND_URI}/all`)
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${BACKEND_URI}/view/${id}`);
  }

  updateBlog(blog): Observable<{}> {
    return this.http.put(`${BACKEND_URI}/${blog.blogId}/edit`, blog);
  }

  createBlog(blog): Observable<{}> {
    return this.http.post(`${BACKEND_URI}/create`, blog);
  }

  deleteBlog(id: string) {
    return this.http.get(`${BACKEND_URI}/${id}/delete`);
  }

}
