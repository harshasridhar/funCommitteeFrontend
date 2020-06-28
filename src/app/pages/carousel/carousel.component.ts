import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {BackendServices} from '../../backend-services';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  errorMessage: String;
  usersAnswerList: any[];

  selected: String;

  userList: any[];


  submit(guessId) {
    console.log(this.selected);
    const loggedInUserName = sessionStorage.getItem('userEmail');
    this.service.validateAnswer({username: loggedInUserName, guessId: guessId, answer: this.selected})
      .subscribe(
        (response) => {
          this.getUserAnswers();
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

  constructor(config: NgbCarouselConfig, private service: BackendServices) {
    config.interval = 20000;
    config.wrap = true;
    config.keyboard = false;
  }
  ngOnInit() {
    this.errorMessage = '';

    this.service.getAllUsers()
      .subscribe(
        (response) => {
          this.userList = response.list;
          this.userList.push('Select User');
          this.selected = 'Select User';
        },
        (error) => {
          this.errorMessage = error;
        }
      );

      this.getUserAnswers();
  }

  getUserAnswers() {
    this.service.getUserAnswers()
      .subscribe(
        (response) => {
          this.usersAnswerList = response.list;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

}




