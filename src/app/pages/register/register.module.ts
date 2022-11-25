import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';
import { Router } from '@angular/router';
import { RegisterPage } from './register.page';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';



@NgModule({
    declarations: [RegisterPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegisterPageRoutingModule
    ]
})


export class RegisterPageModule implements OnInit{

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  form: FormGroup;

  ngOnInit() {
    //this.form = new RegisterPageForm(this.formBuilder).createForm();
  }
}
