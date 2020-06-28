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

  items = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'Node Js'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'PHP', disabled: true},
    {id: 5, name: 'Django'},
    {id: 6, name: 'Angular'},
    {id: 7, name: 'Vue'},
    {id: 8, name: 'ReactJs'},
  ];
  selected = [
    {id: 2, name: 'Node Js'},
    {id: 8, name: 'ReactJs'}
  ];
  name = 'User';

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




