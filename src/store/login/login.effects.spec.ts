import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginEffects } from "./login.effects"
import { provideMockActions } from '@ngrx/effects/testing';
import { EffectsModule } from "@ngrx/effects/src";
import { Actions } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/user";

describe('Login effects', () => {
    let effects: LoginEffects;
    let action$: Observable<Action>;
    let error = {error: 'error'};
    let user = new User();
    user.id = "anyUserId";
    
    let authServiceMock = {
        recoverEmailPassword: (email: string) => {
            if(email == "error@email.com"){
                return throwError(error);
            }
            return of({});
        },
        login: (email: string, password: string) => {
            if(email == "error@email.com"){
                return throwError(error);
            }
            return of(user);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([
                    LoginEffects
                ])
            ],
            providers: [
            //    provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, {useValue: authServiceMock});

        effects = TestBed.get(LoginEffects);
    })

    it('should recover password with existing mail return success', (done) => {
        action$ = of(recoverPassword({email: "amy@email.com"}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordSuccess());
            done();
        });
    })

    it('should recover password with not existing mail return error', (done) => {
        action$ = of(recoverPassword({email: "error@email.com"}));

        effects.recoverPassword$.subscribe(newAction => {
            expect(newAction).toEqual(recoverPasswordFail({error}));
            done();
        });
    })

    it('should login with valid credentials return success', done => {
        action$ = of(login({email: "valid@email.com", password: "anypassword"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginSuccess({user}));
            done();
        })
    })

    it('should login with invalid credentials return fail', done => {
        action$ = of(login({email: "error@email.com", password: "anypassword"}));

        effects.login$.subscribe(newAction => {
            expect(newAction).toEqual(loginFail({error}));
            done();
        })
    })
})