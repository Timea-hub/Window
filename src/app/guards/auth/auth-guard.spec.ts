import { TestBed } from '@angular/core/testing';
import { loginReducer } from 'src/store/login/login.reducers';
import { Store, StoreModule } from '@ngrx/store'

import { AuthGuard } from './auth-guard';
import { AppState } from 'src/store/AppState';
import { User } from 'src/app/model/user/user';
import { loginSuccess } from 'src/store/login/login.actions';
import { Router, RouterModule } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer)
      ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  it('should allow logged user to access page', () => {
    store.dispatch(loginSuccess({user: new User()}));
    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeTruthy();
    })
  });

  it('should not allow logged user to access page if not logged in', () => {

    guard.canLoad().subscribe(isAllowed => {
      expect(isAllowed).toBeFalsy();
    })
  })

  it('should not allow logged user to access login page if not logged in', () => {
    spyOn(router, 'navigateByUrl');

    guard.canLoad().subscribe(isAllowed => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    })
  })
});
