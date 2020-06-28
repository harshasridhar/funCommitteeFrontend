import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BackendServices {

  backendUrl = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) {
  }


  login(userCreds): any {
    return this.httpClient.post<any>(this.backendUrl + '/authenticate', userCreds, {observe: 'response'})
      .pipe(
        map(response => {
          const token = response.headers.get('Authorization');
          sessionStorage.setItem('token', token);
          return response;
        })
      );
  }

  getQuestions(): any {
    return this.httpClient.get(this.backendUrl + '/question/').pipe(
      map(response => {
        return response;
      })
    );
  }

  getUserAnswers(): any {
    const username = sessionStorage.getItem('userEmail');
    const url = this.backendUrl + '/question/answer?username=' + username;
    return this.httpClient.get(url).pipe(
      map(response => {
        return response;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
  }

}
