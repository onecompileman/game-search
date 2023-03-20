import { UserDataService } from './../core/data-services/user-data.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CheckEmailExists } from '../shared/validators/check-email-exists.validator';

@Component({
  selector: 'gs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  fc(formControlName: string): AbstractControl {
    return this.registerForm.get(formControlName);
  }

  private initForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], [CheckEmailExists(this.userDataService)]],
      phone: [null, [Validators.required]]
    })
  }

}
