import { FormBuilder, FormGroup } from "@angular/forms";
//import { ExceptionCode } from "@capacitor/core";
import { RegisterPageForm } from "./register.page.form"


describe('RegisterPageForm', () =>{

    let registerPageForm: RegisterPageForm;
    let form: FormGroup;

    beforeEach(() => {
        registerPageForm = new RegisterPageForm(new FormBuilder());
        form = registerPageForm.getForm();
    })

    it('should empty name be invalid', () => {
        expect(form.get('name').valid).toBeFalsy();
    })

    it('should empty role be invalid', () => {
        expect(form.get('role').valid).toBeFalsy();
    })

    it('should empty email be invalid', () => {
        form.get('email').setValue('invalidEmail');
        expect(form.get('email').valid).toBeFalsy();
    })

    it('should password less than 7 char be invalid', () => {
        form.get('password').setValue("12345")
        expect(form.get('password').valid).toBeFalsy();
    })

    it('should password different from repeat password be invalid', () => {
        form.get('password').setValue("anyPassword")
        form.get('repeatPassword').setValue('anotherPassword');

        expect(form.get('repeatPassword').valid).toBeFalsy();
    })

    it('should create register form on page init', () => {
        //fixture.detectChanges();
    })

    it('should be valid', ()=> {
        form.get('role').setValue("anyRole");
        form.get('name').setValue("anyName");
        form.get('email').setValue("any@email.com");
        form.get('password').setValue("anyPassword");
        form.get('repeatPassword').setValue("anyPassword");
        expect(form.valid).toBeTruthy();
    })

})

function beforeEach(arg0: () => void) {
    throw new Error("Function not implemented.");
}


function expect(valid: boolean) {
    throw new Error("Function not implemented.");
}
