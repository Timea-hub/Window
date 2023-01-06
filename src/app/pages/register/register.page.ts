import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'
import { FirebaseError } from 'firebase/app';
//import * as firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email:any;
  password:any;
  name:any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  reg(){
    this.router.navigate(['/tabs']);
  }

  Register(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(res=>{
      console.log('response = ', res);
    });
  }


}
