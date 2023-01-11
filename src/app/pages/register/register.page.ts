import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular'
import { Store } from '@ngrx/store';
import { FirebaseError, getApp, initializeApp } from 'firebase/app';
//import * as firebase from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.action';
import { login } from 'src/store/login/login.actions';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { RegisterPageForm } from './form/register.page.form';
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {


  registerForm: RegisterPageForm;

  registerStateSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();
  }

  ngOnDestroy(){
    this.registerStateSubscription.unsubscribe();
  }

  register(){
    this.registerForm.getForm().markAllAsTouched();
    //const app = initializeApp(getConfig());
    //const analytics = getAnalytics(app);
    if(this.registerForm.getForm().valid){
      //this.router.navigate(['/tabs']);
      this.store.dispatch(register({userRegister: this.registerForm.getForm().value}));
      this.registerForm.addInfo();
    }
  }

  back(){
    this.router.navigate(['loading']);
  }
  
  

  private createForm(){
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState(){
    this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);

      this.onRegistered(state);

      this.onError(state);
    })
  }

  private onRegistered(state: RegisterState){
    if(state.isRegistered){
      this.store.dispatch(login({
        email: this.registerForm.getForm().value.email,
        password: this.registerForm.getForm().value.password
      }))
    }
  }

  private onError(state: RegisterState){
    if(state.error){
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: "Registration not done"
      }).then(toast => toast.present());
    }
  }

  private toggleLoading(state: RegisterState){
    if(state.isRegistering){
      this.store.dispatch(show());
    } else{
      this.store.dispatch(hide());
    }
  }

}


function getConfig(): import("@firebase/app").FirebaseOptions {
  return this.firebaseConfig;
}
// function writeUserData(user) {
//   firebase.database().ref('users/' + user.uid).set(user).catch(error => {
//       console.log(error.message)
//   });
// }
