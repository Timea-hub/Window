import { LoginPageForm } from "./login.page.form";
import { FormBuilder, FormGroup } from "@angular/forms"

describe('LoginPageForm', () => {

    let loginPageForm;
    let form: FormGroup

    beforeEach(()=>{
        loginPageForm = new LoginPageForm( new FormBuilder());
        form = loginPageForm.createForm();
    })

    
    it('should create login from empty', () =>{

        const loginPageForm = new LoginPageForm(new FormBuilder());
        const form = loginPageForm.createForm();

    
        expect(form).not.toBeNull();
        expect(form.get('email')).not.toBeNull();
        expect(form.get('email').value).toEqual("");
        expect(form.get('email').valid).toBeFalsy();
        expect(form.get('password')).not.toBeNull();
        expect(form.get('password').value).toEqual("");
        expect(form.get('password').valid).toBeFalsy();
    })

    it('should have email invalid if email is not valid', () =>{

        form.get('email').setValue('invalid email');
        expect(form.get('email').valid).toBeFalsy();
    })

    it('should have email valid if email is valid', () =>{

        form.get('email').setValue('valid@email.com');
        expect(form.get('email').valid).toBeTruthy();
    })

    it('should have a valid form', () =>{

        form.get('email').setValue('valid@email.com');
        form.get('password').setValue('anyPassword');
        expect(form.valid).toBeTruthy();
    })
    
})