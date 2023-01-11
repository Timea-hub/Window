import { createAction, props } from "@ngrx/store"
import { UserRegister } from "src/app/model/user/UserRegister";
import * as internal from "stream";
import { GenericCallbackWrapper} from "src/app/pages/register/register.page";

export const register = createAction('[Register]', props<{payload: GenericCallbackWrapper<UserRegister, UserRegister>} >());
export const registerSuccess = createAction('[Register] success');
export const registerFail = createAction('[Register] fail', props<{error: any}>());