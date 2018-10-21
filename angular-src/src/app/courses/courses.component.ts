import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  categoryName;
  courses;
  //some : Array<Object>;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('catname');
    this.getCourses();
    
  }
  getCourses()
  {
    this.courseService.getCourseByCat(this.categoryName).subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    })
  }
  vote(courseid)
  {
    console.log("clicked");
    let userid = localStorage.getItem('userid');
    let data = { id: userid, value: 1 }
    this.courseService.addVote(courseid, data).subscribe((data) => {
      console.log(courseid,data);
      this.getCourses();
    })
    
  }


}
