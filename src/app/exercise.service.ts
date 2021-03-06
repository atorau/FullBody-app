import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { SessionService } from './session.service'
import 'rxjs/add/operator/map';

@Injectable()
export class ExerciseService {
    BASE_URL: string = 'http://localhost:3000/api';

  constructor(private http: Http,
    private SessionService: SessionService) { }

  getList() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/exercises`, options)
      .map((res) => res.json());
  }
  get(id) {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/exercises/${id}`, options)
      .map((res) => res.json());
  }

}
