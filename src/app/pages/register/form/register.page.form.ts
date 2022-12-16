import { FormBuilder, FormGroup } from "@angular/forms";

export class RegisterPageForm{
    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
    }

    private createForm() : FormGroup{
        return this.formBuilder.group({

        });
    }

     
}