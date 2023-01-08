import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginPage } from './login.page';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { createAction, Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { loginReducer } from 'src/store/login/login.reducers';
import { AppState } from 'src/store/AppState';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { hide, show } from 'src/store/loading/loading.action';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer)
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should go to tabs/home page pressing the login button', () => {
    spyOn(router, 'navigate');

    component.login();
    
    expect(router.navigate).toHaveBeenCalledWith(['/tabs']);
  });

  it('should go to register page after pushing register button', () => {
    spyOn(router, 'navigate');

    component.register();
    
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  });

  it('should recover email/password of forgot email/password', () => {
    fixture.detectChanges(); //start page
    component.form.get('email').setValue("timea@email.com"); //user set valid
    page.querySelector("#recoverPasswordButton").click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  })

  it('should show loading when recovering password', () => {
    
    fixture.detectChanges(); //start page
    store.dispatch(recoverPassword());
    page.querySelector("#recoverPasswordButton").click();
    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeTruthy(); 
    })
  })

  it('should hide loading component and show a success message when the password is recovered', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges(); //start page
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeFalsy(); 
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should hide loading component and show a error message when the password is not recovered', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges(); //start page
    store.dispatch(recoverPassword());
    store.dispatch(recoverPasswordFail({error: "message"}));
    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

});
