import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.state';
import {addPost} from '../state/posts.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ])
    })
  }

  showDescriptionErrors() {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm.touched && !descriptionForm.valid) {
      if(descriptionForm.errors['required']) {
        return 'Description is required';
      }
      if(descriptionForm.errors['minlength']) {
        return 'Description should be minimum 10 characters';
      }
    }
    return null;
  }

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    this.store.dispatch(addPost({post: this.postForm.value}))
  }
}
