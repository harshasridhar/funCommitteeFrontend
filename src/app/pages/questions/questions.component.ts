import { Component, OnInit } from '@angular/core';
import {BackendServices} from '../../backend-services';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  errorMessage: String;
  questions: any[];

  constructor(private service: BackendServices) { }

  ngOnInit() {
    this.errorMessage = '';

    this.service.getQuestions()
      .subscribe(
        (response) => {
         const questionList = response.list;
         this.questions = questionList.sort((a, b) => (a.id > b.id) ? 1 : -1);
        },
        (error) => {
          this.errorMessage = error;
        }
      );

  }


}
