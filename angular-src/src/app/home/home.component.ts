import { Router } from '@angular/router';
import { CourseService } from './../services/course.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allCategories;
  constructor(
    private courseS: CourseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCats();
  }
  goToCourse(c)
  {
    this.router.navigateByUrl("/courses/"+c.name);
  }
  getCats()
  {
    this.courseS.getCategories().subscribe((data) => {
      console.log(data);
      this.allCategories = data;
    })
    
  }

}
