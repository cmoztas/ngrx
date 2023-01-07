import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {Observable} from 'rxjs';
import {getPosts} from '../state/posts.selectors';
import {Post} from '../../models/posts.model';
import {deletePost} from '../state/posts.action';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.posts$ = this.store.select(getPosts);
  }

  onDeletePost(id: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.store.dispatch(deletePost({postId: id}));
    }
  }
}
