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
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { hide, show } from 'src/store/loading/loading.action';
import { ExploreContainerComponent } from 'src/app/explore-container/explore-container.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/model/user/user';
import { Observable, of, throwError } from 'rxjs';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

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
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
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
    store.select('loading').subscribe(loginState => {
      expect(loginState.show).toBeTruthy(); 
    })
  })


  it('should hide loading component and show a success message when the password is recovered', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges(); //start page
    store.dispatch(recoverPassword({email: "amy@email.com"}));
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy(); 
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should hide loading component and show a error message when the password is not recovered', () => {
    spyOn(toastController, 'create');

    fixture.detectChanges(); //start page
    store.dispatch(recoverPassword({email: "amy@email.com"}));
    store.dispatch(recoverPasswordFail({error: "message"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should show loading component and start login when logging in', () => {
    fixture.detectChanges(); //start page
    component.form.get('email').setValue('timea@email.com');
    component.form.get('password').setValue('123456');
    page.querySelector("#loginButton").click();
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy(); 
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('should hide loading component and send user to home page when logged in', () => {
    spyOn(router, 'navigate');

    fixture.detectChanges(); //start page
    store.dispatch(login({email: "valid@email.com", password: "anypassword"}));
    store.dispatch(loginSuccess({user: new User()}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy(); 
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
    expect(router.navigate).toHaveBeenCalledWith(['/tabs']);
  })

  it('should hide loading component and show error when user failed to log in', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges(); //start page
    store.dispatch(login({email: "valid@email.com", password: "anypassword"}));
    store.dispatch(loginFail({error: {message: 'error message'}}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy(); 
    })
    
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

});
