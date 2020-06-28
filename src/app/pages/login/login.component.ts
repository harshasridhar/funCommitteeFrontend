import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackendServices } from '../../../../src/app/backend-services';
import {Router} from '@angular/router';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  userEmail: string;
  userPassword: string;
  errorMessage: string

  constructor(private service: BackendServices, private router: Router, private data: DataService) { }

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
          const username = response.body.name;
          const userId = response.body.id;
          sessionStorage.setItem('userEmail', this.userEmail);
          sessionStorage.setItem('userName', username);
          sessionStorage.setItem('userId', userId);

          this.data.changeMessage(username);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

}
