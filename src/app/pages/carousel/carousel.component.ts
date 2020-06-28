import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {BackendServices} from '../../backend-services';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  errorMessage: String;
  usersAnswerList: any[];

  constructor(config: NgbCarouselConfig, private service: BackendServices) {
    config.interval = 20000;
    config.wrap = true;
    config.keyboard = false;
  }
  ngOnInit() {
    this.errorMessage = '';

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




