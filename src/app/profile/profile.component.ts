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
 isAuth:boolean;
 constructor(
     private session: SessionService,
     private router:  Router,
     private route: ActivatedRoute,
     private profileService: ProfileService
   // private userService: UserService
 ) {
   this.user = JSON.parse(localStorage.getItem("user"))
   console.log("USER",this.user)

 }

 ngOnInit() {
  let user= JSON.parse(localStorage.getItem("user"))
  this.session.getUser(user._id)
  .subscribe((user)=>{
    console.log(user)
    this.user=user
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
