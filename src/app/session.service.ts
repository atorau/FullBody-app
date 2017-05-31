import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import jwtDecode from  'jwt-decode';

@Injectable()
export class SessionService implements CanActivate {
  public token: string;
  public isAuth: boolean;
  public user: string;
  public role: string;
  public id: string;

  BASE_URL: string = 'http://localhost:3000';

  constructor(private router: Router, private http: Http) {
    this.token = localStorage.getItem('token');
      if (this.token != null) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
   }

   canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true\
      this.token = localStorage.getItem('token');
      this.user = jwtDecode(this.token).user;
      this.isAuth = true;
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    this.isAuth = false;
    return false;
  }

  isAuthenticated() {
    return this.token != null ? true : false;
  }

  signup(user) {
  	return this.http.post(`${this.BASE_URL}/signup`, user)
  		.map((response) => response.json())
  		.map((response) => {
  			let token = response.token;
  			const user = response.user;
  			if (token) {
          // set token property
          this.token = token;
          this.user = jwtDecode(token).user;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', token );
          localStorage.setItem('user', JSON.stringify(user));

          this.isAuth = true;
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
  		})
  		.catch((err) => Observable.throw(err));
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/login`, user).map((response: Response) => {
      // login successful if there's a jwt token in the response
      let token = response.json() && response.json().token;
      let user = response.json() && response.json().user;
      let role = response.json() && response.json().role;
      this.id = response.json() && response.json().id;

      if (token) {
        // set token property
        this.token = token;
        this.user = jwtDecode(token).user;
        this.role = jwtDecode(token).role;

        console.log("user name", user.username);

        this.isAuth = true;
        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token );
        localStorage.setItem('user', user.username);
        localStorage.setItem('id', user._id);
        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }
    });
  }
  getUser(id){
    return this.http.get(`${this.BASE_URL}/api/users/`+id)
    .map((response: Response)=>{
      return response.json();
    });
  }

  edit(user){
    console.log(user)
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    let options = new RequestOptions({ headers: headers });
    console.log(options);
    return this.http.put(`${this.BASE_URL}/api/users/${user._id}`, user, options).map((response) =>{
      let user = response.json() && response.json().user;
      localStorage.setItem('user', JSON.stringify(user) );
      return true;
    })


  }




  logout() {
    // clear token remove user from local storage to log user out
    this.token = null;
    this.user = null;
    this.isAuth = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
}
