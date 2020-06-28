import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendServices } from '../../../../src/app/backend-services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  userEmail: string;
  userPassword: string;
  errorMessage: string

  constructor(private service: BackendServices, private router: Router) { }

  ngOnInit() {
    this.errorMessage = '';
  }
  ngOnDestroy() {
  }

  loginUser() {
    this.errorMessage = '';
    if (!this.userEmail || this.userEmail && this.userEmail.trim().length === 0) {
      this.errorMessage = 'Email cannot be empty';
      return;
    } else if (!this.userPassword || this.userPassword.trim().length === 0) {
      this.errorMessage = 'Password cannot be empty';
      return;
    }
    this.service.login({username: this.userEmail, password: this.userPassword})
      .subscribe(
        (response) => {
          sessionStorage.setItem('userEmail', this.userEmail);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

}
