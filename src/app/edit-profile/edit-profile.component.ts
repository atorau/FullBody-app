import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../profile.service';
import { FileUploader } from "ng2-file-upload";
import {Router, ActivatedRoute} from "@angular/router";
import { SessionService } from "../session.service";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user : Object = {};

  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/users/edit`,
    authToken: `JWT ${this.session.token}`
  });

  newUser ={
    _id: "",
    username:       "",
    password:       "",
    image:          "",
    name:           "",
    lastName:       "",
    age:            "",
    height:         "",
    weigth:         "",
    mass_muscle:    "",
    mass_water:     "",
    mass_bone:      "",
    mass_fat:       "",
    count_total:    "",
    count_variable: ""
  }
  feedback: string;
  isAuth: boolean;
  constructor( private session: SessionService,
   private router:  Router,
   private route: ActivatedRoute,
   private profileService: ProfileService) { this.user = JSON.parse(localStorage.getItem("user"))
  console.log("USER",this.user) }

  ngOnInit() {
    let user= JSON.parse(localStorage.getItem("user"))
    this.session.getUser(user._id)
     .subscribe((user)=>{
       this.user=user
       console.log(this.user)
     });
     this.newUser._id = user._id;
     this.newUser.username = user.username;
     this.newUser.password = user.password;
     this.newUser.image = user.image;
     this.newUser.name = user.name;
     this.newUser.lastName = user.lastName;
     this.newUser.age = user.age;
     this.newUser.height = user.height;
     this.newUser.weigth = user.weigth;
     this.newUser.mass_muscle = user.mass_muscle;
     this.newUser.mass_water = user.mass_water;
     this.newUser.mass_bone = user.mass_bone;
     this.newUser.mass_fat = user.mass_fat;
     this.newUser.count_total = user.count_total;
     this.newUser.count_variable = user.count_variable;


    // this.uploader.onSuccessItem = (item, user) => {
    //   localStorage.removeItem("user")
    //   localStorage.setItem("user",user);
    // };
    // this.uploader.onErrorItem = (item, response, status, headers) => {
    //   this.feedback = JSON.parse(response).message;
    // };
  }
  submit(){
    let user= JSON.parse(localStorage.getItem("user"))

    console.log("userEdit", this.user)

    this.session.edit(this.newUser)
    .subscribe((userEdit)=>{
      console.log("inside subscribe")
      this.router.navigate(['/profile']);
    })
  }

  addImage(){
    this.uploader.onBuildItemForm = (item,form)=>{
      form.append("id",this.user["_id"] )
    };
    this.uploader.uploadAll();
  }

}
