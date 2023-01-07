import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {getPostById} from '../state/posts.selectors';
import {Post} from '../../models/posts.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {updatePost} from '../state/posts.action';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy{
  post: Post;
  postForm: FormGroup;
  postSubscription: Subscription

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id =  +params.get('id');
      this.postSubscription = this.store
        .select(getPostById, {id})
        .subscribe(data => {
          this.post = data;
          this.createForm();
        });
    })
  }

  createForm() {
    this.postForm = new FormGroup({
      id: new FormControl(this.post.id),
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10)
      ])
    })
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }

    this.store.dispatch(updatePost({post: this.postForm.value}));
    this.router.navigate(['posts']).then();
  }

  ngOnDestroy(): void {
    if(this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

}
