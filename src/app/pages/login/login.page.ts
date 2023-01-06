import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//import { StoredCallback } from '@capacitor/core/types/definitions-internal';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) { }

  form: FormGroup;

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  login(){
    this.router.navigate(['/tabs']);
  }

  register(){
    this.router.navigate(['register']);
  }

  forgotEmailPassword(){
    this.store.dispatch(show())

    setTimeout(() => {
      this.store.dispatch(hide())
    }, 3000)
  }
}
