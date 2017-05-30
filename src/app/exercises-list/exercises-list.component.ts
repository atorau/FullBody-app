import { Component, OnInit } from '@angular/core';
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


  constructor(private session: SessionService, private exercise:ExerciseService) { }

  ngOnInit() {
      this.user=JSON.parse(localStorage["user"]);
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

  }
  done(){
    this.user["count_total"] ++;
    this.session.edit(this.user).subscribe(()=>{
      window.localStorage.setItem("date", JSON.stringify(new Date()) );
      this.view = false;
    })

  }
}
