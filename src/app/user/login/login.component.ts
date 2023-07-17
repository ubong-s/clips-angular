import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  showAlert = false;
  alertMsg = 'Please wait, we are logging you in';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}

  async login() {
    this.showAlert = true;
    this.inSubmission = true;
    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      this.alertColor = 'red';
      this.alertMsg = 'A unexpected error occured. Please try again';
      this.inSubmission = false;

      return;
    }
    this.alertColor = 'green';
    this.alertMsg = 'Succees. You are now logged in';
  }
}
