import { FormBuilder, FormGroup } from "@angular/forms";

export class RegisterPageForm{
    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup{
        return this.formBuilder.group({
            role: [''],
            email: [''],
            name: [''],
            password: [''],
            repeatPassword: ['']

        });
    }

    getForm() : FormGroup{
        return this.form;
    }
     
}