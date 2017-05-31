import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../profile.service';
import { SessionService } from '../session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService],
})

export class ProfileComponent implements OnInit {
 user: Object = {};
 isCollapsed: boolean = false;
 isAuth:boolean;
 constructor(
     private session: SessionService,
     private router:  Router,
     private route: ActivatedRoute,
     private profileService: ProfileService
   // private userService: UserService
  )
{
 //   this.user = JSON.parse(localStorage.getItem("user"))
 //   console.log("USER",this.user)
 //
}

 ngOnInit() {
  let id= localStorage["id"];
  this.session.getUser(id)
  .subscribe((user)=>{
    console.log(user)
    this.user=user
    console.log("a aver ", this.user);
  })


 }
}












//   constructor(
//     private session: SessionService,
//     private user:ProfileService
//   ) { }
//
//   ngOnInit() {
//     console.log(this.session)
//     // this.profile.getList()
//     //   .subscribe((users) => {
//     //     this.profiles = profiles;
//       // });
//     }
//
// }
