import { TestBed } from "@angular/core/testing";
import { Action, StoreModule } from "@ngrx/store";
import { Observable, of, throwError } from "rxjs";
import { provideMockActions } from '@ngrx/effects/testing';
import { EffectsModule } from "@ngrx/effects/src";
import { Actions } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth/auth.service";
import { User } from "src/app/model/user/user";
import { RegisterEffects } from "./register.effects";
import { UserRegister } from "src/app/model/user/UserRegister";
import { register, registerFail, registerSuccess } from "./register.actions";

describe('Register effects', () => {
    let effects: RegisterEffects;
    let action$: Observable<Action>;
    let error = {error: 'error'};
    let user = new User();
    user.id = "anyUserId";
    
    let authServiceMock = {
        register(userRegister: UserRegister){
            if(userRegister.email == "error@email.com"){
                return throwError(error);
            }
            return of({});
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot([]),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([
                    RegisterEffects
                ])
            ],
            providers: [
            //    provideMockActions(() => actions$)
            ]
        }).overrideProvider(AuthService, {useValue: authServiceMock});

        effects = TestBed.get(RegisterEffects);
    })

    it('should register -> success', (done) => {
        action$ = of(register({userRegister: new UserRegister()}));

        effects.register$.subscribe(newAction => {
            expect(newAction).toEqual(registerSuccess());
            done();
        });
    })

    it('should register -> fail', (done) => {
        const userRegister = new UserRegister();
        userRegister.email = "error@email.com";
        action$ = of(register({userRegister}));

        effects.register$.subscribe(newAction => {
            expect(newAction).toEqual(registerFail({error}));
            done();
        });
    })
    
})