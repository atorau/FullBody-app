import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = false;
  constructor(
  	private session: SessionService,
  	private router:  Router,
  ) {}

  ngOnInit() {
    this.session.user=localStorage["user"];
    this.session.id=localStorage["id"];
  }

  logout() {
  	this.session.logout();
  	// this.router.navigate(['/login']);
  }


}
