import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class RegisterPageForm{
    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup{
        let form = this.formBuilder.group({
            //role: ['', [Validators.required]],
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            repeatPassword: ['', [Validators.required]]

        });

        form.get('repeatPassword').setValidators(matchPasswordAndRepeatPassword(form));
        return form;
    }

    getForm() : FormGroup{
        return this.form;
    }
     
}



function matchPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn{
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    const validator = () => {
        return password.value == repeatPassword.value ? null : {isntMatching: true}
    };

    return validator;
}