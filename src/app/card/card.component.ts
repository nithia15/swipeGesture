import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';
import { User } from './user'
import { Subject } from 'rxjs';
const data = require("./users.json")


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))
    ])
  ]

})
export class CardComponent {

  public users: User[] = data;
  public index = 0;
  @Input()
  parentSubject: Subject<any>;
  @Output() hideActionIcons = new EventEmitter();
  initialLoad = true;
  profileSelected = false;
  addDetails: any;
  animationStarted = false;


  animationState: string;
  constructor() { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      this.startAnimation(event);
    });
  }

  startAnimation(state) {
    this.profileSelected = false;
    this.animationStarted = true;
    if (!this.animationState) {
      this.animationState = state;
    }
    if (state === 'swipeleft') {
      this.hideActionIcons.emit('true');
      alert('Not Interested')
    } else {
      this.hideActionIcons.emit('true');
      alert('Interested')
    }
  }

  resetAnimationState(state) {
    this.animationState = '';
      if (this.profileSelected) {
        
      } else if (this.animationStarted) {
        this.animationStarted = false;
        this.index++;
      }
  }

  onProfileSelected() {
    this.profileSelected = true;
    this.hideActionIcons.emit('false');
  }

  onProfileRejected() {
    alert('Not Interested');
    this.startAnimation('swipeleft');
  }


  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }

}
