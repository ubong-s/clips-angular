import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created';
  alertColor = 'blue';
  inSubmission = false;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(120),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
      ),
    ]),
    confirm_password: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
    ]),
  });

  constructor(private auth: AuthService) {}

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try {
      await this.auth.createUser({
        ...this.registerForm.value,
        age: Number(this.registerForm.value.age),
      } as IUser);
    } catch (error) {
      console.log(error);

      this.alertMsg = 'An unexpected error occured.Please try again later';
      this.alertColor = 'red';
      this.inSubmission = false;

      return;
    }

    this.alertMsg = 'Success, your ccount has been created';
    this.alertColor = 'green';
  }
}
