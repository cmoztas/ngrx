import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {changeChannelName, customIncrement} from '../state/counter.actions';
import {getChannelName} from '../state/counter.selectors';
import {Observable} from 'rxjs';
import {AppState} from '../../store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {
  value: number;
  channelName$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.channelName$ = this.store.select(getChannelName);
  }

  onAdd = () => this.store.dispatch(customIncrement({count: +this.value}));

  onChangeChannelName = () => this.store.dispatch(changeChannelName());
}
