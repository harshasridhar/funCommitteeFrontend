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
  userList: any[];
  percentageCompletion: number;


  submit(selectedUser) {
    const loggedInUserName = sessionStorage.getItem('userEmail');
    this.service.validateAnswer({username: loggedInUserName, guessId: selectedUser.id, answer: selectedUser.answer})
      .subscribe(
        (response) => {
          for (let i =  0; i < this.usersAnswerList.length; i++) {
              const user = this.usersAnswerList[i];
              if (user.id === selectedUser.id) {
                user.retriesLeft = response.retriesLeft;
                user.status = response.status;
                break;
              }
          }
          this.service.getGameStatus().subscribe(response => {
            this.percentageCompletion = Math.ceil(response.percentageCompletion);
          })
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
          this.percentageCompletion = Math.ceil(response.percentageCompletion);
          console.log(this.percentageCompletion);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }

}




