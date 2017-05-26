import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { SessionService } from './session.service'
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  BASE_URL: string = 'http://localhost:3000/api';

  constructor(private http: Http,
    private SessionService: SessionService) { }

  // get(id) {
  //   let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.get(`${this.BASE_URL}/profile/${id}`, options)
  //     .map((res) => res.json());
  // }

  edit(users) {
  let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
  let options = new RequestOptions({ headers: headers });
  return this.http.put(`${this.BASE_URL}/profile/${users.id}`, users, options )
    .map((res) => res.json());
  }

}
