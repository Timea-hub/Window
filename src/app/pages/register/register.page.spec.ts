import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterPage } from './register.page';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageModule } from './register.module';
import { Store, StoreModule } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { registerReducer } from 'src/store/register/register.reducers';


describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page;
  let store: Store<AppState>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [IonicModule.forRoot(),
                AppRoutingModule,
                ReactiveFormsModule,
                RegisterPageModule,  
                StoreModule.forRoot([]),
                StoreModule.forFeature("loading", loadingReducer),
                StoreModule.forFeature("register", registerReducer)
              ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should go to home page pushing register button', () => {
    spyOn(router, 'navigate');

    component.register();
    
    expect(router.navigate).toHaveBeenCalledWith(['/tabs']);
  })


  it('should not go to home page if register invalid', () => {
    fixture.detectChanges();

    page.querySelector('ion-button').click();

    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeFalsy();
    })
  })

  it('given form is valid -> click register -> register', () => {
    fixture.detectChanges();

    fillForm();

    clickOnRegisterButton();

    store.select("register").subscribe(state => {
      expect(state.isRegistering).toBeTruthy();
    })
  })

  function clickOnRegisterButton(){
    page.querySelector('ion-button').click();
  }

  function fillForm(){
    component.registerForm.getForm().get('name').setValue("anyName");
        component.registerForm.getForm().get('phone').setValue("123456789");
        component.registerForm.getForm().get('email').setValue("any@email.com");
        component.registerForm.getForm().get('password').setValue("anyPassword");
        component.registerForm.getForm().get('repeatPassword').setValue("anyPassword");
  }
});
