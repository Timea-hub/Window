import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth/auth.service";
import { of } from "rxjs";
import { register, registerFail, registerSuccess } from "./register.actions";
import { UserRegister } from "src/app/model/user/UserRegister";

@Injectable()
export class RegisterEffects {
    
    constructor(private actions$: Actions, private authService: AuthService){

    }
    

    // register$ = createEffect(() => this.actions$.pipe(
    //     ofType(register),
    //     switchMap((payload: {userRegister: UserRegister}) =>
    //     this.authService.register(payload.userRegister).pipe(
    //         map(() => registerSuccess()),
    //         catchError(error => of(registerFail({error})))

    //     ))
    // ))

    register$ = createEffect(() => this.actions$.pipe(
        ofType(register),
        switchMap((action) =>
        this.authService.register(
          action.payload.data)
          .pipe(
            map((response) => {
                //   if (timeOffResponseData != null && action.payload.callback!= null) {
                     action.payload.callback(response);
                //   }
                  return  registerSuccess();
                }),
                catchError((err) => of(registerFail(err)))
                ))));
}