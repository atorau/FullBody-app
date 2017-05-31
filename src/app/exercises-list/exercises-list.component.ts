import { Component, OnInit,  ElementRef, NgZone} from '@angular/core';
import { ExerciseService } from './../exercise.service';
import { ProfileService } from './../profile.service';
import { FilterPipe } from '../filter.pipe';
import {Router, ActivatedRoute} from "@angular/router";
import { SessionService } from "../session.service";



@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css'],
  providers: [ExerciseService],
})
export class ExercisesListComponent implements OnInit {
  exercises;
  user : Object = {};
  view: boolean = true;


  constructor(private session: SessionService, private exercise:ExerciseService, private el: ElementRef, private _ngZone: NgZone) { }

  ngOnInit() {
    console.log("heeeeeyyyyyyyyy",this.session.role)
    let id= localStorage["id"];
    this.session.getUser(id)
     .subscribe((user)=>{
       this.user=user
       console.log(this.user)
     });
    // miro en localStorage si tengo el date
      let fixed= window.localStorage.getItem("date").slice(1,11);
      let now = JSON.stringify(new Date())
      now = now.slice(1,11);
      console.log("now", now);
      console.log ("fixed", fixed);
      // if(fixed === now){
      //   this.view = false;
      // };

    this.exercise.getList()
      .subscribe((exercises) => {
        this.exercises = exercises;
      });
      console.log("hello")


  }

  ngAfterViewChecked(){
    console.log(document.getElementById("exercises"))

    let iframes = this.el.nativeElement.getElementsByTagName("iframe")
    let self = this
    iframes[0].onload = function(){
      console.log("iframe ready")
      document.getElementById("exercises").classList.remove("hidden");
      document.getElementById("spinner").classList.add("hidden")
    }
  }

  done(){

    this.user["count_total"] ++;
    this.session.edit(this.user).subscribe(()=>{
      window.localStorage.setItem("date", JSON.stringify(new Date()) );
      this.view = false;
    })

  }
  changesrc(frame:any){
    frame.src="'https://www.youtube.com/embed/' + this.exercises[0].video_link.slice(32) | safe"
  }
}
