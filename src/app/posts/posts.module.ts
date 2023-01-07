import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsRoutingModule} from './posts-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AddPostComponent} from './add-post/add-post.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {StoreModule} from '@ngrx/store';
import {postsReducer} from './state/posts.reducer';
import {POST_STATE_NAME} from './state/posts.selectors';

@NgModule({
  declarations: [
    AddPostComponent,
    EditPostComponent,
    PostsListComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer)
  ]
})
export class PostsModule{}
