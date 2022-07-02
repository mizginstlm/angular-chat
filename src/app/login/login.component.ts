import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
loginForm!: FormGroup;
  nickname = '';
  password = '';
  ref = firebase.database().ref('users/');
  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  if (localStorage.getItem('nickname, password')) {
      this.router.navigate(['/roomlist']);
    }
    this.loginForm = this.formBuilder.group({
      'nickname' : ['', Validators.required]
    });
  }

onFormSubmit(){
    const login = this.loginForm.value;
    this.ref.orderByChild('nickname').equalTo(login.nickname).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/roomlist']);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set(login);
        localStorage.setItem('nickname', login.nickname);
        this.router.navigate(['/roomlist']);
      }
    });
  }
}


 