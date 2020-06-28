import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {BackendServices} from '../../backend-services';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  userName: String;
  constructor(location: Location,  private element: ElementRef, private router: Router,
              private service: BackendServices, private data: DataService) {
    this.location = location;
  }

  ngOnInit() {
    const name = sessionStorage.getItem('userName');
    if (name) {
      this.userName = name;
    }
   // this.data.currentMessage.subscribe(message => this.userName = message);
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
        titlee = titlee.slice( 1 );
    }

    for (let item = 0; item < this.listTitles.length; item++) {
        if (this.listTitles[item].path === titlee) {
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

}
