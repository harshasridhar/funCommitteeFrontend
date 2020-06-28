import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DataService {
  name = sessionStorage.getItem('userName');
  message = name ? name : 'User';
  private messageSource = new BehaviorSubject(this.message);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

}
