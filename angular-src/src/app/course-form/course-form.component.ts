import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
  }

  add(data)
  {
    console.log(data);
    this.courseService.addCourse(data).subscribe((data) => {
      console.log(data);
    })
  }
}
