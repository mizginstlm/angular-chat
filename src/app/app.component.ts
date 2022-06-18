import { Component } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const config = {
  apiKey: 'AIzaSyCRO4RNXscf346ZZTW1Jz8U4oJ7aZlAXwQ',
  databaseURL:'https://chatapp-b0ee8-default-rtdb.firebaseio.com'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-chat';
  constructor() {
  firebase.initializeApp(config);
}
}
