import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CourseService {

  constructor(
    private http : HttpClient

  ) { }

  getCategories()
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let url = "categories";
    console.log(url);
    return this.http.get(url, {headers: headers});
  }
  getCourseByCat(name)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let url = "courses/category="+name;
    console.log(url);
    return this.http.get(url, {headers: headers});
  }
  addCourse(data)
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
    console.log(token);
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', token);
    let url = "courses";
    console.log(url);
    return this.http.post(url,data, {headers: headers});
  }
  addVote(courseid, data)
  {
    let headers = new HttpHeaders();
    
    headers.append('Content-Type', 'application/json');
    //headers.append('Authorization', token);
    let url = "courses/"+courseid+"/vote";
    console.log(url);
    return this.http.post(url,data, {headers: headers});
  }
}
