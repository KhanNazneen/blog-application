import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BlogListComponent } from './blog-list.component';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogEditComponent } from './blog-edit.component';
import { BlogCreateComponent } from './blog-create.component';

import { AuthGuardService } from './../auth/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'blogs', component: BlogListComponent},
      {path: 'blog/:id', component: BlogDetailComponent},
      {
        path: 'blog/edit/:id',
        component: BlogEditComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'create',
        component: BlogCreateComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],

  declarations: [
    BlogListComponent,
    BlogDetailComponent,
    BlogEditComponent,
    BlogCreateComponent
  ]
})

export class BlogModule { }
