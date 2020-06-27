import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  counts = [1, 2, 3, 4, 5];

  constructor(config: NgbCarouselConfig) {
    config.interval = 20000;
    config.wrap = true;
    config.keyboard = false;
  }
  ngOnInit() {
  }

}




