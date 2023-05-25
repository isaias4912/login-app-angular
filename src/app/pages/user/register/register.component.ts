import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { IDataForm } from 'src/app/common/models/idata-form';

@Component({
  selector: 'register-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formRegister!: FormGroup;
  public dataForm: IDataForm = { submitted: false };
  constructor(
    private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      user: [null, [Validators.email, Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      passwordConfirm: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80),]],
    }, {
      validator: this.confirmedValidator('password', 'passwordConfirm')
    });
    console.log(this.formRegister)
  }
  /**
   * Validator password
   * @returns 
   */
  public confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ notEqual: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  public register(): void {
    this.dataForm = { ...this.dataForm, submitted: true };
    if (this.formRegister.valid) {
      let user = this.formRegister.value;
      console.log(user);
    }
  }
  get f() {
    return this.formRegister.controls;
  }
}
