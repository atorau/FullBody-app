import { Component, OnInit } from '@angular/core';
import { ExerciseService } from './../exercise.service';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.css'],
  providers: [ExerciseService],
})
export class ExercisesListComponent implements OnInit {
  exercises;
  constructor(private exercise:ExerciseService) { }

  ngOnInit() {
    this.exercise.getList()
      .subscribe((exercises) => {
        this.exercises = exercises;
      });
  }

}
