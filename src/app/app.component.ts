import { Component } from '@angular/core';
import { Subject} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  parentSubject:Subject<string> = new Subject();
  showIcons = false;

  constructor() {

  }

 cardAnimation(value) {
    this.parentSubject.next(value);
  }

  profileShortListed() {
    alert('Shortlisted');
  }

  hideActionIcons(event) {
    this.showIcons = (event == "true") ? false : true;
  }

}
